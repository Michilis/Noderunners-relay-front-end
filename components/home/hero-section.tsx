'use client';

import Image from 'next/image';
import { LoginButton } from "@/components/auth/login-button";

interface HeroSectionProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  isLoading: boolean;
}

export function HeroSection({ isAuthenticated, onLogin, isLoading }: HeroSectionProps) {
  return (
    <div className="text-center mb-16">
      <div className="mb-8">
        <Image
          src="https://github.com/artdesignbySF/noderunners/blob/main/Noderunners-Logo-White-small.png?raw=true"
          alt="Noderunners Logo"
          width={300}
          height={100}
          className="mx-auto"
          priority
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        The Noderunners Nostr Relay
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        High-performance Nostr relay service with one-time admission fee
      </p>

      {!isAuthenticated && (
        <LoginButton 
          onClick={onLogin}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}