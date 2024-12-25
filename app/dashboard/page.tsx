'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { StatusCard } from "@/components/dashboard/status-card";
import { ConnectionDetails } from "@/components/dashboard/connection-details";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { logout } from '@/lib/auth/nostr';
import { useAuth } from '@/hooks/use-auth';
import { useWhitelist } from '@/hooks/use-whitelist';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { status, isLoading } = useWhitelist(user?.pubkey ?? null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <Image
              src="https://github.com/artdesignbySF/noderunners/blob/main/Noderunners-Logo-White-small.png?raw=true"
              alt="Noderunners Logo"
              width={200}
              height={67}
              className="mx-auto"
              priority
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>

          <div className="space-y-8">
            <StatusCard 
              isWhitelisted={status.isWhitelisted}
              timeRemaining={status.timeRemaining}
              isLoading={isLoading}
            />

            {status.isWhitelisted && (
              <ConnectionDetails pubkey={user.pubkey} />
            )}

            {!status.isWhitelisted && !isLoading && (
              <div className="text-center">
                <Button 
                  onClick={() => router.push('/')}
                  size="lg"
                >
                  Purchase Access
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}