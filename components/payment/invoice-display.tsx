'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Zap } from "lucide-react";

interface InvoiceDisplayProps {
  invoice: string;
}

export function InvoiceDisplay({ invoice }: InvoiceDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(invoice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <img 
          src={`https://azzamo.tips/api/v1/qrcode/${invoice}`}
          alt="Lightning Invoice QR Code"
          className="w-64 h-64 bg-white p-2 rounded-lg"
        />
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-2">Lightning Invoice:</p>
        <div className="flex gap-2">
          <code className="flex-1 p-2 bg-black/30 rounded text-sm font-mono break-all">
            {invoice.substring(0, 30)}...
          </code>
          <Button 
            variant="secondary"
            size="icon"
            onClick={handleCopy}
            className={copied ? "text-green-500" : ""}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button 
        onClick={() => window.location.href = `lightning:${invoice}`}
        className="w-full bg-[#ff9500] hover:bg-[#ff9500]/90"
      >
        <Zap className="mr-2 h-4 w-4" />
        Open in Wallet
      </Button>
    </div>
  );
}