import { nip19 } from 'nostr-tools';

export function validateNostrKey(key: string): { valid: boolean; pubkey?: string; npub?: string } {
  try {
    if (key.startsWith('npub')) {
      const decoded = nip19.decode(key);
      return { 
        valid: true, 
        pubkey: decoded.data as string,
        npub: key 
      };
    } else if (key.length === 64) {
      const npub = nip19.npubEncode(key);
      return { 
        valid: true, 
        pubkey: key,
        npub 
      };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}