'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { Plan } from '@/lib/config/plans';
import { PaymentHeader } from './payment-header';
import { InvoiceDisplay } from './invoice-display';
import confetti from 'canvas-confetti';

interface PaymentStatusProps {
  invoice: string | null;
  error: string | null;
  isPaid: boolean;
  isLoading: boolean;
  plan: Plan | null;
}

export function PaymentStatus({ invoice, error, isPaid, isLoading, plan }: PaymentStatusProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isPaid) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaid, router]);

  if (error) {
    return (
      <Card className="p-6 bg-black/50 border-destructive/20">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 bg-[#25262b] border-0">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Generating invoice...</p>
        </div>
      </Card>
    );
  }

  if (isPaid) {
    return (
      <Card className="p-6 bg-[#25262b] border-0">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-500 mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">
            {plan?.title} activated!
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Redirecting to dashboard in {countdown} seconds...
          </p>
          <Button 
            onClick={() => router.push('/dashboard')}
            className="bg-green-500 hover:bg-green-600"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  if (!invoice || !plan) return null;

  return (
    <Card className="p-6 bg-[#25262b] border-0">
      <PaymentHeader plan={plan} />
      <InvoiceDisplay invoice={invoice} />
      <p className="text-center text-gray-400 text-sm mt-6">
        Waiting for payment...
      </p>
    </Card>
  );
}