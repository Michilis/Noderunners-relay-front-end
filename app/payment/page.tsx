'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentStatus } from "@/components/payment/payment-status";
import { createInvoice, checkPayment } from '@/lib/payment/service';
import { addToWhitelist } from '@/lib/whitelist/service';
import { useAuth } from '@/hooks/use-auth';
import { plans } from '@/lib/config/plans';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [invoice, setInvoice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const planId = searchParams.get('plan');

  useEffect(() => {
    if (!user?.pubkey || !planId || !(planId in plans)) {
      router.push('/');
      return;
    }

    async function generateInvoice() {
      try {
        const selectedPlan = plans[planId as keyof typeof plans];
        const paymentRequest = await createInvoice({
          amount: selectedPlan.amount,
          memo: `Noderunners Relay ${selectedPlan.title} - ${user.pubkey}`,
        });
        setInvoice(paymentRequest);
      } catch (err) {
        setError('Failed to generate invoice');
      } finally {
        setIsLoading(false);
      }
    }

    generateInvoice();
  }, [planId, user?.pubkey, router]);

  useEffect(() => {
    if (!invoice || isPaid || isChecking) return;

    const checkInterval = setInterval(async () => {
      try {
        setIsChecking(true);
        const paid = await checkPayment(invoice);
        if (paid) {
          setIsPaid(true);
          if (user?.pubkey) {
            const planDuration = planId === 'lifetime' ? 'lifetime' : 'yearly';
            await addToWhitelist(user.pubkey, planDuration);
            setTimeout(() => {
              router.push('/dashboard');
            }, 5000);
          }
        }
      } catch (error) {
        console.error('Error checking payment:', error);
      } finally {
        setIsChecking(false);
      }
    }, 2000);

    return () => clearInterval(checkInterval);
  }, [invoice, isPaid, user?.pubkey, router, isChecking]);

  return (
    <div className="min-h-screen bg-[#1a1b1e] flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white"
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      <main className="flex-1 container mx-auto px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <PaymentStatus
            invoice={invoice}
            error={error}
            isPaid={isPaid}
            isLoading={isLoading}
            plan={planId ? plans[planId as keyof typeof plans] : null}
            userPubkey={user?.pubkey}
          />
        </div>
      </main>
    </div>
  );
}