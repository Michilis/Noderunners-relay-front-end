import { UserInfoResponse } from './types/api';

const NODERUNNERS_WHITELIST_API_URL = process.env.NODERUNNERS_WHITELIST_API_URL;
const NODERUNNERS_API_KEY = process.env.NODERUNNERS_API_KEY;

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

export async function fetchWhitelistStatus(pubkey: string): Promise<UserInfoResponse> {
  try {
    const response = await fetch(`${NODERUNNERS_WHITELIST_API_URL}/whitelist/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NODERUNNERS_API_KEY || ''
      },
      body: JSON.stringify({ pubkey }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch whitelist status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching whitelist status:', error);
    throw error;
  }
} 