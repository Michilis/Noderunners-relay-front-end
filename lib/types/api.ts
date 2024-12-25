export interface UserInfoRequest {
  identifier: string;
}

export interface UserInfoResponse {
  pubkey: string;
  npub: string;
  time_remaining: number;
  is_whitelisted: boolean;
}

export interface ApiErrorResponse {
  detail: string | { msg: string }[];
}