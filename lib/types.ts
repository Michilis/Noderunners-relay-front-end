export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  priceType: string;
  disabled: boolean;
  image?: string;
  categories?: string[];
}