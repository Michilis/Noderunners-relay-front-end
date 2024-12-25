'use client';

import { NostrLoginAuthOptions } from 'nostr-login';
import { setAuthState, clearAuthState } from './state';
import { NostrUser } from './types';

export async function initNostrLogin() {
  if (typeof window === 'undefined') return;

  try {
    // Wait for the script to be loaded
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { init } = await import('nostr-login');
    init({
      theme: 'ocean',
      darkMode: true,
      noBanner: false,
      onAuth: (npub: string, options: NostrLoginAuthOptions) => {
        if (options.pubkey) {
          const user: NostrUser = {
            pubkey: options.pubkey,
            npub
          };
          setAuthState(user);
          document.dispatchEvent(new CustomEvent('nlAuth', {
            detail: { type: 'login', user }
          }));
        }
      }
    });
  } catch (error) {
    console.error('Failed to initialize nostr-login:', error);
    throw error;
  }
}

export function logout() {
  clearAuthState();
  document.dispatchEvent(new Event("nlLogout"));
}