'use client';

import { useState, useEffect } from 'react';
import { AuthState } from '@/lib/auth/types';
import { getAuthState } from '@/lib/auth/state';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(getAuthState());

  useEffect(() => {
    const handleAuth = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.type === 'login') {
        setAuthState({
          isAuthenticated: true,
          user: customEvent.detail.user
        });
      }
    };

    const handleLogout = () => {
      setAuthState({
        isAuthenticated: false,
        user: null
      });
    };

    document.addEventListener('nlAuth', handleAuth);
    document.addEventListener('nlLogout', handleLogout);

    return () => {
      document.removeEventListener('nlAuth', handleAuth);
      document.removeEventListener('nlLogout', handleLogout);
    };
  }, []);

  return authState;
}