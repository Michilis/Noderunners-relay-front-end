'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/btcpay";

interface PriceCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  selected: boolean;
}

export function PriceCard({ product, onSelect, selected }: PriceCardProps) {
  return (
    <Card className={`p-6 flex flex-col space-y-4 ${selected ? 'ring-2 ring-primary' : ''}`}>
      <h3 className="text-2xl font-bold">{product.title}</h3>
      <p className="text-muted-foreground">{product.description}</p>
      <div className="flex items-baseline mt-4">
        <span className="text-5xl font-extrabold">{parseInt(product.price).toLocaleString()}</span>
        <span className="ml-1 text-xl text-muted-foreground">sats</span>
      </div>
      <Button 
        onClick={() => onSelect(product)}
        variant={selected ? "default" : "outline"}
        className="mt-6"
        disabled={product.disabled}
      >
        Select Plan
      </Button>
    </Card>
  );
}