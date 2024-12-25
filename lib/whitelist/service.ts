import { NostrJson, WhitelistCache } from './types';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let whitelistCache: WhitelistCache | null = null;

export async function fetchWhitelist(): Promise<Set<string>> {
  // Return cached data if it's still valid
  if (whitelistCache && Date.now() - whitelistCache.lastUpdated < CACHE_TTL) {
    return whitelistCache.pubkeys;
  }

  try {
    const response = await fetch('https://noderunnersapi.azzamo.net/.well-known/nostr.json', {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch whitelist: ${response.status}`);
    }

    const data: NostrJson = await response.json();
    if (!data || !data.names) {
      throw new Error('Invalid whitelist data format');
    }

    const pubkeys = new Set(Object.values(data.names));

    // Update cache
    whitelistCache = {
      pubkeys,
      lastUpdated: Date.now()
    };

    return pubkeys;
  } catch (error) {
    console.error('Error fetching whitelist:', error);
    // If cache exists, return it even if expired
    if (whitelistCache) {
      return whitelistCache.pubkeys;
    }
    throw error;
  }
}

export async function isWhitelisted(pubkey: string): Promise<boolean> {
  if (!pubkey) return false;
  
  try {
    const whitelist = await fetchWhitelist();
    return whitelist.has(pubkey);
  } catch (error) {
    console.error('Error checking whitelist status:', error);
    return false;
  }
}

export async function addToWhitelist(pubkey: string, duration: 'yearly' | 'lifetime'): Promise<void> {
  try {
    const response = await fetch(`${NODERUNNERS_WHITELIST_API_URL}/whitelist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NODERUNNERS_API_KEY || ''
      },
      body: JSON.stringify({ pubkey, duration }),
    });

    if (!response.ok) {
      throw new Error('Failed to update whitelist');
    }
  } catch (error) {
    console.error('Error updating whitelist:', error);
    throw error;
  }
}

// Ensure this function is exported
export { addToWhitelist };