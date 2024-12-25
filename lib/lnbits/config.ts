export const LNBITS_CONFIG = {
  API_URL: process.env.LNBITS_API_URL || 'https://azzamo.tips/api/v1',
  INVOICE_KEY: process.env.LNBITS_INVOICE_KEY || 'dd60e90cc19444ddad3ba96de4ad4586'
} as const;