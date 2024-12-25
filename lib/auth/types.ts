export interface NostrUser {
  pubkey: string;
  npub: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: NostrUser | null;
}

export interface WhitelistStatus {
  isWhitelisted: boolean;
  timeRemaining?: number | null;
}