import { LNBITS_CONFIG } from './config';
import { CreateInvoiceParams, LNbitsInvoiceResponse } from './types';

export async function createInvoice({ amount, memo, unit = 'sat' }: CreateInvoiceParams): Promise<string> {
  try {
    const response = await fetch(`${LNBITS_CONFIG.API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': LNBITS_CONFIG.INVOICE_KEY
      },
      body: JSON.stringify({
        out: false,
        amount,
        memo,
        unit,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }

    const data: LNbitsInvoiceResponse = await response.json();
    return data.payment_request;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}