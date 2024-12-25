export interface Plan {
  amount: number;
  title: string;
  description: string;
}

export const plans = {
  'yearly': {
    amount: 10000,
    title: '1 Year Access',
    description: '1 Year access to the Noderunners relay'
  },
  'lifetime': {
    amount: 21000,
    title: 'Lifetime Access',
    description: 'Lifetime access to the Noderunners Relay'
  }
} as const;

export type PlanId = keyof typeof plans;