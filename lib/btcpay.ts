const DEMO_URL = process.env.BTCPAY_API_URL || 'https://mainnet.demo.btcpayserver.org';
const DEMO_STORE_ID = process.env.BTCPAY_STORE_ID || 'demo-store';
const DEMO_API_KEY = process.env.BTCPAY_API_KEY || 'demo-api-key';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  priceType: string;
  disabled: boolean;
}

export async function createInvoice(product: Product) {
  const apiEndpoint = `/api/v1/stores/${DEMO_STORE_ID}/invoices`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `token ${DEMO_API_KEY}`
  };

  const payload = {
    amount: parseInt(product.price) / 1000, // Convert from sats to BTC
    currency: 'BTC',
    metadata: {
      productId: product.id,
      orderId: crypto.randomUUID()
    }
  };

  try {
    const response = await fetch(DEMO_URL + apiEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
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