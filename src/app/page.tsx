import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ValueProp3DWrapper from "@/components/ValueProp3DWrapper";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import DiscoverWeekly from "@/components/sections/DiscoverWeekly";
import TopArtists from "@/components/sections/TopArtists";
import LyricsExperience from "@/components/sections/LyricsExperience";
import PremiumTiers from "@/components/sections/PremiumTiers";
import CrossPlatform from "@/components/sections/CrossPlatform";
import FooterCTA from "@/components/sections/FooterCTA";
import { getFeaturedPlaylists, getNewReleases } from "@/lib/spotify";

export default async function Home() {
  let chartPlaylists: any[] = [];
  let chartAlbums: any[] = [];

  try {
    const [playlistsRes, albumsRes] = await Promise.all([
      getFeaturedPlaylists(),
      getNewReleases()
    ]);
    if (playlistsRes?.playlists?.items) {
      chartPlaylists = playlistsRes.playlists.items;
    }
    if (albumsRes?.albums?.items) {
      chartAlbums = albumsRes.albums.items;
    }
  } catch (error) {
    console.error("Failed to fetch Spotify data:", error);
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: 3D Value Prop */}
        <ValueProp3DWrapper />

        {/* Section 3: Features Bento Grid */}
        <FeaturesGrid />

        {/* Section 4: How It Works - Pinned Horizontal Scroll */}
        <HowItWorks />

        {/* Section 5: Discover Weekly - 3D Pin Cards */}
        <DiscoverWeekly playlists={chartPlaylists} />

        {/* Section 6: Top Artists / New Releases */}
        <TopArtists releases={chartAlbums} />

        {/* Section 7: Lyrics Experience - Text Generate Effect */}
        <LyricsExperience />

        {/* Section 8: Premium Pricing - Meteors */}
        <PremiumTiers />

        {/* Section 9: Cross-Platform Devices - Hover Cards */}
        <CrossPlatform />

        {/* Section 10: Footer CTA + Footer */}
        <FooterCTA />
      </main>
    </>
  );
}
