interface UserInfoResponse {
  pubkey: string;
  npub: string;
  time_remaining: number;
  is_whitelisted: boolean;
}

interface ApiErrorResponse {
  detail: string | { msg: string }[];
}

export async function checkUserInfo(identifier: string): Promise<UserInfoResponse> {
  try {
    const response = await fetch('https://noderunnersapi.azzamo.net/api/user/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier }),
    });

    if (!response.ok) {
      const errorData = await response.json() as ApiErrorResponse;
      const errorMessage = Array.isArray(errorData.detail) 
        ? errorData.detail[0]?.msg 
        : errorData.detail;
      throw new Error(errorMessage || 'Failed to check user status');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to check access status. Please try again.');
  }
}