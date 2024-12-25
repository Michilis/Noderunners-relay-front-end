'use client';

import { Zap } from "lucide-react";
import { Plan } from '@/lib/config/plans';

interface PaymentHeaderProps {
  plan: Plan;
}

export function PaymentHeader({ plan }: PaymentHeaderProps) {
  return (
    <div className="text-center">
      <Zap className="h-12 w-12 text-[#ff9500] mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">{plan.title}</h2>
      <p className="text-gray-400 mb-4">{plan.description}</p>
      <p className="text-3xl font-bold text-[#ff9500] mb-6">
        {plan.amount.toLocaleString()} sats
      </p>
    </div>
  );
}