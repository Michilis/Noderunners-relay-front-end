export interface CreateInvoiceParams {
  amount: number;
  memo: string;
  unit?: string;
}

export interface LNbitsInvoiceResponse {
  payment_hash: string;
  payment_request: string;
  checking_id: string;
}