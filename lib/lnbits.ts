// LNbits API client
const LNBITS_API_URL = 'https://noderunnersapi.azzamo.net/api/v1';

export interface CreateInvoiceParams {
  amount: number;
  memo: string;
  unit?: string;
}

export async function createInvoice({ amount, memo, unit = 'sat' }: CreateInvoiceParams) {
  try {
    const response = await fetch(`${LNBITS_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

    return await response.json();
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}