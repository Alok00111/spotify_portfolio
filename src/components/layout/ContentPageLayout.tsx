"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Link from "next/link";

interface ContentPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ContentPageLayout({
  title,
  subtitle,
  children,
  className
}: ContentPageLayoutProps) {
  const router = useRouter();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!endRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay so the user sees the bottom, then redirect
            setTimeout(() => {
              router.push("/");
            }, 1200);
          }
        });
      },
      { threshold: 1.0 }
    );

    observer.observe(endRef.current);
    return () => observer.disconnect();
  }, [router]);

  return (
    <div className={cn("min-h-screen pt-32 pb-24 relative overflow-hidden", className)}>
      {/* Scroll Progress Bar */}
      <ScrollProgress className="h-[3px] bg-gradient-to-r from-spotify via-[#1ed760] to-[#15e06c]" />

      {/* Background Particles from Magic UI */}
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={70}
        ease={80}
        color="#1db954"
        refresh
      />
      
      {/* Subtle Spotify Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(29,185,84,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        {/* Back to Home Button */}
        <BlurFade delay={0.05} inView>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </BlurFade>

        <div className="mb-16">
          <BlurFade delay={0.1} inView>
            <SparklesText 
              className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-outfit)] tracking-tighter mb-6" 
              colors={{ first: "#1db954", second: "#ffffff" }}
              sparklesCount={6}
            >
              {title}
            </SparklesText>
          </BlurFade>
          
          {subtitle && (
            <BlurFade delay={0.2} inView>
              <p className="text-xl md:text-2xl text-muted-foreground">{subtitle}</p>
            </BlurFade>
          )}
        </div>
        
        <BlurFade delay={0.3} inView>
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-[family-name:var(--font-outfit)] prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-spotify prose-a:no-underline hover:prose-a:underline">
            {children}
          </div>
        </BlurFade>
      </div>

      {/* Auto-redirect trigger at the bottom */}
      <div ref={endRef} className="mt-24 text-center">
        <BlurFade delay={0.1} inView>
          <p className="text-sm text-muted-foreground/40 animate-pulse">↑ You've reached the end — redirecting home...</p>
        </BlurFade>
      </div>
    </div>
  );
}
