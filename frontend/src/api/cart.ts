import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export type Cart = {
  cart_id: string;
  user_id?: string;
  created_at: string;
};

export type CartProduct = {
  cart_product_id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  product_name: string;
  price: number;
  image: string;
};

// Criar um novo carrinho
export async function createCart(customer_id?: string): Promise<Cart> {
  const response: AxiosResponse<Cart> = await axios.post(`${API_BASE_URL}/carts`, {
    customer_id
  });
  return response.data;
}

// Adicionar produto ao carrinho
export async function addCartProduct(
  cart_id: string,
  product_id: string,
  quantity: number
): Promise<CartProduct> {
  const response: AxiosResponse<CartProduct> = await axios.post(
    `${API_BASE_URL}/cartproducts`,
    { cart_id, product_id, quantity }
  );
  return response.data;
}

// Atualizar quantidade do produto no carrinho
export async function updateCartProduct(
  cart_product_id: string,
  quantity: number
): Promise<CartProduct> {
  const response: AxiosResponse<CartProduct> = await axios.put(
    `${API_BASE_URL}/cartproducts/${cart_product_id}`,
    { quantity }
  );
  return response.data;
}

// Remover produto do carrinho
export async function removeCartProduct(
  cart_product_id: string
): Promise<void> {
  await axios.delete(`${API_BASE_URL}/cartproducts/${cart_product_id}`);
}

// Obter todos os produtos do carrinho 
export async function getCartProducts(cart_id: string): Promise<CartProduct[]> {
  const response: AxiosResponse<CartProduct[]> = await axios.get(
    `${API_BASE_URL}/carts/${cart_id}/products`
  );
  return response.data;
}