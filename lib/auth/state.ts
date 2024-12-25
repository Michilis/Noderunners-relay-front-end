'use client';

import { AuthState, NostrUser } from './types';

const AUTH_KEY = 'nostr_auth_state';

export function getAuthState(): AuthState {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null };
  }

  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) {
    return { isAuthenticated: false, user: null };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

export function setAuthState(user: NostrUser | null) {
  if (typeof window === 'undefined') return;

  const state: AuthState = {
    isAuthenticated: !!user,
    user
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  return state;
}

export function clearAuthState() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}