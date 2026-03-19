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
    next: { revalidate: 3500 }, // Cache token for a bit less than 1 hour
  });
  
  const data = await response.json();
  
  if (!data.access_token) {
    console.error("Failed to get Spotify access token:", JSON.stringify(data));
  }
  
  return data;
};

/**
 * Fetches trending/popular tracks via the Search API.
 * Spotify restricted access to editorial playlists (404/403) for client_credentials,
 * so we use search as a reliable alternative.
 */
export const getSpotifyChart = async () => {
  const { access_token } = await getAccessToken();
  if (!access_token) {
    console.error("getSpotifyChart: No access token available");
    return null;
  }

  try {
    const params = new URLSearchParams({
      q: "top hits 2025",
      type: "track",
      limit: "20",
      market: "US",
    });
    const url = `https://api.spotify.com/v1/search?${params.toString()}`;
    console.log("getSpotifyChart: Fetching", url);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("getSpotifyChart: API error", response.status, text);
      return null;
    }

    const data = await response.json();
    const tracks = (data.tracks?.items || []).filter(Boolean);
    console.log("getSpotifyChart: Got", tracks.length, "tracks");

    // Transform into the format the web-player page expects
    return {
      name: "Global Top Hits",
      description: "The biggest tracks in the world right now — powered by Spotify.",
      images: tracks.length > 0 ? [{ url: tracks[0]?.album?.images?.[0]?.url }] : [],
      tracks: {
        items: tracks.map((track: any) => ({ track })),
      },
    };
  } catch (err) {
    console.error("getSpotifyChart error:", err);
    return null;
  }
};

/**
 * Fetches a specific Spotify playlist by ID
 */
export const getSpotifyPlaylist = async (playlistId: string) => {
  const { access_token } = await getAccessToken();
  if (!access_token) return null;

  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 3600 },
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
  if (!access_token) return null;

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,album,artist&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    console.warn("Failed to search Spotify:", response.status);
    return null;
  }

  return response.json();
}

/**
 * Fetches popular playlists via Search API (replaces broken browse/featured-playlists)
 */
export const getFeaturedPlaylists = async (limit = 6) => {
  const { access_token } = await getAccessToken();
  if (!access_token) return null;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=top+hits+2025&type=playlist&limit=${limit}&market=US`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      console.warn("Failed to fetch playlists via search:", response.status);
      return null;
    }
    const data = await response.json();
    return { playlists: data.playlists };
  } catch (err) {
    console.error("getFeaturedPlaylists error:", err);
    return null;
  }
};

/**
 * Fetches new releases via Search API (replaces broken browse/new-releases)
 */
export const getNewReleases = async (limit = 8) => {
  const { access_token } = await getAccessToken();
  if (!access_token) return null;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=tag%3Anew&type=album&limit=${limit}&market=US`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      console.warn("Failed to fetch new releases via search:", response.status);
      return null;
    }
    const data = await response.json();
    return { albums: data.albums };
  } catch (err) {
    console.error("getNewReleases error:", err);
    return null;
  }
};

