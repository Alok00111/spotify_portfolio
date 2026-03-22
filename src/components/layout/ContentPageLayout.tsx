"use client";

import { cn } from "@/lib/utils";
import BlurFade from "@/components/ui/blur-fade";
import Particles from "@/components/ui/particles";
import SparklesText from "@/components/ui/sparkles-text";

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
  return (
    <div className={cn("min-h-screen pt-32 pb-24 relative overflow-hidden", className)}>
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
        <div className="mb-16">
          <BlurFade delay={0.1} inView>
            <SparklesText 
              text={title} 
              className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-outfit)] tracking-tighter mb-6" 
              colors={{ first: "#1db954", second: "#ffffff" }}
              sparklesCount={6}
            />
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
    </div>
  );
}
