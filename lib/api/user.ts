import { UserInfoRequest, UserInfoResponse, ApiErrorResponse } from '../types/api';

const API_BASE_URL = 'https://noderunnersapi.azzamo.net/api';

export async function checkUserInfo(identifier: string): Promise<UserInfoResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If the error is about the user not being whitelisted, we don't treat it as an error
      if (data.detail === "User not found" || data.detail === "User not whitelisted") {
        return {
          pubkey: identifier,
          npub: "",
          time_remaining: 0,
          is_whitelisted: false
        };
      }
      
      const errorMessage = Array.isArray(data.detail) 
        ? data.detail[0]?.msg 
        : data.detail;
      throw new Error(errorMessage || 'Failed to check user status');
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('not whitelisted')) {
      return {
        pubkey: identifier,
        npub: "",
        time_remaining: 0,
        is_whitelisted: false
      };
    }
    console.error('API Error:', error);
    throw error;
  }
}