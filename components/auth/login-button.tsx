'use client';

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

interface LoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function LoginButton({ onClick, isLoading }: LoginButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      size="lg" 
      className="px-8 bg-primary hover:bg-primary/90"
      disabled={isLoading}
    >
      <LogInIcon className="mr-2 h-4 w-4" />
      {isLoading ? "Connecting..." : "Login with Nostr"}
    </Button>
  );
}