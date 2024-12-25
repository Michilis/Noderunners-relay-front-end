import { LNBITS_CONFIG } from './config';

export interface CreateInvoiceParams {
  amount: number;
  memo: string;
  unit?: string;
}

interface LNbitsPaymentResponse {
  payment_hash: string;
  payment_request: string;
  checking_id: string;
}

interface LNbitsCheckResponse {
  paid: boolean;
}

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

    const data: LNbitsPaymentResponse = await response.json();
    return data.payment_request;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}

export async function checkPayment(paymentRequest: string): Promise<boolean> {
  try {
    // First get the payment hash from the payment request
    const response = await fetch(`${LNBITS_CONFIG.API_URL}/payments/decode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': LNBITS_CONFIG.INVOICE_KEY
      },
      body: JSON.stringify({
        data: paymentRequest
      })
    });

    if (!response.ok) {
      throw new Error('Failed to decode payment request');
    }

    const decodedData = await response.json();
    const paymentHash = decodedData.payment_hash;

    // Then check the payment status using the payment hash
    const checkResponse = await fetch(`${LNBITS_CONFIG.API_URL}/payments/${paymentHash}`, {
      headers: {
        'X-Api-Key': LNBITS_CONFIG.INVOICE_KEY
      }
    });

    if (!checkResponse.ok) {
      throw new Error('Failed to check payment status');
    }

    const checkData: LNbitsCheckResponse = await checkResponse.json();
    return checkData.paid;
  } catch (error) {
    console.error('Error checking payment:', error);
    throw error;
  }
}