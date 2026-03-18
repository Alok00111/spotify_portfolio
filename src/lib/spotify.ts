const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID || "";
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "";
  
  if (!client_id || !client_secret) {
    console.error("SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing from environment variables!");
    return { access_token: null };
  }
  
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });
  
  const data = await response.json();
  
  if (!data.access_token) {
    console.error("Failed to get Spotify access token:", JSON.stringify(data));
  }
  
  return data;
};

/**
 * Fetches the Spotify global top 50 playlist
 */
export const getSpotifyChart = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    console.warn("Failed to fetch Spotify chart:", response.status, text);
    return null;
  }

  return response.json();
};

/**
 * Fetches a specific Spotify playlist by ID
 */
export const getSpotifyPlaylist = async (playlistId: string) => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    console.warn(`Failed to fetch Spotify playlist ${playlistId}:`, response.status, text);
    return null;
  }

  return response.json();
};

/**
 * Search Spotify for tracks, albums, artists
 */
export const searchSpotify = async (query: string, limit = 20) => {
  const { access_token } = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,album,artist&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.warn("Failed to search Spotify:", response.status);
    return null;
  }

  return response.json();
}

/**
 * Fetches Spotify Featured Playlists
 */
export const getFeaturedPlaylists = async (limit = 6) => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    console.warn("Failed to fetch featured playlists:", response.status);
    return null;
  }
  return response.json();
};

/**
 * Fetches Spotify New Releases (Albums)
 */
export const getNewReleases = async (limit = 8) => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    console.warn("Failed to fetch new releases:", response.status);
    return null;
  }
  return response.json();
};
