'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PurchasePlans } from "@/components/dashboard/purchase-plans";
import { StatusCard } from "@/components/dashboard/status-card";
import { HeroSection } from "@/components/home/hero-section";
import { FooterInfo } from "@/components/home/footer-info";
import { useAuth } from '@/hooks/use-auth';
import { useWhitelist } from '@/hooks/use-whitelist';
import { PlanId } from '@/lib/config/plans';

export function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { status, isLoading } = useWhitelist(user?.pubkey ?? null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
    import('nostr-login')
      .then(async ({ init }) => {
        init({
          theme: 'ocean',
          darkMode: true,
          noBanner: true, // Ensure no banner is shown automatically
          onAuth: (npub, options) => {
            if (options.pubkey) {
              // Handle successful login
            }
          }
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (isAuthenticated && status.isWhitelisted) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, status.isWhitelisted, router]);

  const handleSelectPlan = (planId: PlanId) => {
    if (!user?.pubkey) {
      setIsAuthLoading(true);
      return;
    }
    router.push(`/payment?plan=${planId}`);
  };

  const handleLoginWithNostr = () => {
    document.dispatchEvent(new CustomEvent('nlLaunch', { detail: 'login' }));
  };

  // Prevent hydration mismatch by not rendering auth-dependent content on server
  if (!isClientSide) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <HeroSection 
              isAuthenticated={false}
              onLogin={handleLoginWithNostr}
              isLoading={false}
            />
            <FooterInfo />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <HeroSection 
            isAuthenticated={isAuthenticated}
            onLogin={handleLoginWithNostr}
            isLoading={isAuthLoading}
          />

          {isAuthenticated && user && (
            <div className="space-y-8">
              <StatusCard 
                isWhitelisted={status.isWhitelisted}
                timeRemaining={status.timeRemaining}
                isLoading={isLoading}
              />

              {!status.isWhitelisted && !isLoading && (
                <PurchasePlans onSelectPlan={handleSelectPlan} />
              )}
            </div>
          )}

          <FooterInfo />
        </div>
      </main>
    </div>
  );
}