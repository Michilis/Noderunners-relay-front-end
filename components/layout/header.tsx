'use client';

import { NodeRunnersLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NodeRunnersLogo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            POOL
          </Button>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            PODCASTS
          </Button>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            TUTORIALS
          </Button>
        </nav>
      </div>
    </header>
  );
}