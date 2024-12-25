'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheckIcon } from "lucide-react";

interface NostrFormProps {
  nostrKey: string;
  onKeyChange: (key: string) => void;
  onCheck: () => void;
  isChecking: boolean;
}

export function NostrForm({ nostrKey, onKeyChange, onCheck, isChecking }: NostrFormProps) {
  return (
    <div className="flex gap-4">
      <Input
        placeholder="Enter your Nostr npub or pubkey"
        value={nostrKey}
        onChange={(e) => onKeyChange(e.target.value)}
        className="bg-black/50 border-primary/20"
      />
      <Button 
        onClick={onCheck} 
        disabled={isChecking}
        className="min-w-[140px]"
      >
        {isChecking ? (
          "Checking..."
        ) : (
          <>
            <ShieldCheckIcon className="mr-2 h-4 w-4" />
            Get Access
          </>
        )}
      </Button>
    </div>
  );
}