'use client';

import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";

interface ConnectionDetailsProps {
  pubkey: string;
}

export function ConnectionDetails({ pubkey }: ConnectionDetailsProps) {
  const relays = [
    "wss://relay.noderunners.network",
    "wss://nostr.noderunners.network"
  ];

  return (
    <Card className="p-6 bg-black/30 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Connection Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Available Relays</label>
          {relays.map((relay, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <code className="flex-1 p-2 bg-black/20 rounded text-primary font-mono text-sm">
                {relay}
              </code>
              <CopyButton value={relay} />
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Your Pubkey</label>
          <div className="flex items-center gap-2 mt-1">
            <code className="flex-1 p-2 bg-black/20 rounded text-primary font-mono text-sm break-all">
              {pubkey}
            </code>
            <CopyButton value={pubkey} />
          </div>
        </div>
      </div>
    </Card>
  );
}