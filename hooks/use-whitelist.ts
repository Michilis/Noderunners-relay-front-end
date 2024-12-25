'use client';

import { useState, useEffect } from 'react';
import { WhitelistStatus } from '@/lib/auth/types';
import { isWhitelisted } from '@/lib/whitelist/service';

export function useWhitelist(pubkey: string | null) {
  const [status, setStatus] = useState<WhitelistStatus>({
    isWhitelisted: false,
    timeRemaining: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkStatus() {
      if (!pubkey) {
        setIsLoading(false);
        return;
      }

      try {
        const whitelisted = await isWhitelisted(pubkey);
        setStatus({
          isWhitelisted: whitelisted,
          timeRemaining: null // Add time remaining logic if needed
        });
        setError(null);
      } catch (err) {
        setError('Failed to check whitelist status');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    checkStatus();
  }, [pubkey]);

  return { status, isLoading, error };
}