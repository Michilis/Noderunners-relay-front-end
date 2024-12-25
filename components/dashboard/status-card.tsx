'use client';

import { Card } from "@/components/ui/card";
import { ShieldCheckIcon, ShieldXIcon } from "lucide-react";

interface StatusCardProps {
  isWhitelisted: boolean;
  timeRemaining?: number | null;
}

export function StatusCard({ isWhitelisted, timeRemaining }: StatusCardProps) {
  return (
    <Card className="p-6 bg-black/50 border-primary/20">
      <div className="flex items-center gap-4">
        {isWhitelisted ? (
          <>
            <ShieldCheckIcon className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold text-green-500">Whitelisted</h3>
              <p className="text-muted-foreground">You have access to the relay</p>
            </div>
          </>
        ) : (
          <>
            <ShieldXIcon className="h-8 w-8 text-destructive" />
            <div>
              <h3 className="text-xl font-semibold text-destructive">Not Whitelisted</h3>
              <p className="text-muted-foreground">Purchase access to continue</p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}