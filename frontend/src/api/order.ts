export type OrderStatus = 'Concluído' | 'Cancelado';

export type Order = {
  order_id: number;
  created_at: Date;
  status: OrderStatus;
  total: number; 
  cart_products: CartProducts[];
};

export type CartProducts = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
};