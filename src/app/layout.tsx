import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Home, Search, Library, User } from "lucide-react";
import Link from "next/link";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Experience | Awwwards",
  description: "An ultra-premium frontend experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-primary/30`}
      >
        <AuthProvider>
          <LenisWrapper>{children}</LenisWrapper>
          
          {/* Global Dock */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <Dock direction="middle" className="bg-black/60 border-white/10 shadow-2xl">
              <DockIcon>
                <Link href="/" className="flex items-center justify-center w-full h-full text-white/70 hover:text-white transition-colors duration-200">
                  <Home className="w-5 h-5" />
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="/web-player" className="flex items-center justify-center w-full h-full text-white/70 hover:text-white transition-colors duration-200">
                  <Search className="w-5 h-5" />
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="/web-player" className="flex items-center justify-center w-full h-full text-white/70 hover:text-white transition-colors duration-200">
                  <Library className="w-5 h-5" />
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="/about" className="flex items-center justify-center w-full h-full text-white/70 hover:text-white transition-colors duration-200">
                  <User className="w-5 h-5" />
                </Link>
              </DockIcon>
            </Dock>
          </div>

          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
