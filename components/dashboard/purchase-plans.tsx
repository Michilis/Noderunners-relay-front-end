'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZapIcon } from "lucide-react";
import { plans, PlanId } from "@/lib/config/plans";

interface PurchasePlansProps {
  onSelectPlan: (planId: PlanId) => void;
}

export function PurchasePlans({ onSelectPlan }: PurchasePlansProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {(Object.entries(plans) as [PlanId, typeof plans[PlanId]][]).map(([id, plan]) => (
        <Card key={id} className="p-6 bg-black/50 border-primary/20 hover:border-primary/40 transition-colors">
          <h3 className="text-2xl font-bold text-primary">{plan.title}</h3>
          <p className="text-muted-foreground mt-2">{plan.description}</p>
          <div className="flex items-baseline mt-4">
            <span className="text-5xl font-extrabold text-primary">
              {plan.amount.toLocaleString()}
            </span>
            <span className="ml-1 text-xl text-muted-foreground">sats</span>
          </div>
          <Button 
            onClick={() => onSelectPlan(id)}
            className="mt-6 w-full"
          >
            <ZapIcon className="mr-2 h-4 w-4" />
            Select Plan
          </Button>
        </Card>
      ))}
    </div>
  );
}