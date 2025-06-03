import axios from "axios";
import type { AxiosResponse } from "axios";

export type OrderStatus = 'Concluído' | 'Cancelado';

const API_BASE_URL = "http://localhost:3000/api";

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

export async function createOrder(cart_id: number): Promise<Order> {
  console.log("Creating order for cart_id:", cart_id);
  const response: AxiosResponse<Order> = await axios.post(
    `${API_BASE_URL}/orders`,
    {
      cart_id,
    }
  );
  console.log("Order created successfully:", response.data);
  return response.data;
}