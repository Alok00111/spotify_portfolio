import ContentPageLayout from "@/components/layout/ContentPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For the Record - Spotify",
  description: "Get the latest news and insights from Spotify.",
};

export default function ForTheRecordPage() {
  return (
    <ContentPageLayout 
      title="For the Record" 
      subtitle="The official news, insights, and stories from Spotify."
    >
      <div className="content-section">
        <h2>Latest News</h2>
        <p>Explore the latest product announcements, company news, and stories from the world of Spotify.</p>
        <p>
          We are committed to empowering creators globally. Our mission is to unlock the potential of human creativity
          by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity 
          to enjoy and be inspired by it.
        </p>
      </div>

      <div className="content-section">
        <h2>Audio Innovation</h2>
        <p>Discover how we're pushing the boundaries of audio technology, deep learning, and personalization to build the best listening experience possible.</p>
      </div>
    </ContentPageLayout>
  );
}
