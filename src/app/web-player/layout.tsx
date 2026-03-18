import { PlayerProvider } from "@/context/PlayerContext";
import Sidebar from "@/components/player/Sidebar";
import BottomPlayer from "@/components/player/BottomPlayer";

export default function WebPlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <div className="flex h-screen bg-black overflow-hidden relative">
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-[#222222] to-black h-[calc(100vh-96px)]">
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </div>

        {/* Global Player anchored to the bottom */}
        <BottomPlayer />
      </div>
    </PlayerProvider>
  );
}
