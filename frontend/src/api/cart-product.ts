import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export type CartProduct = {
  cart_product_id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  product?: {
    product_name: string;
    price: number;
    image: string;
  };
};

export async function getCartProducts(cart_id: number): Promise<CartProduct[]> {
  const response: AxiosResponse<CartProduct[]> = await axios.get(
    `${API_BASE_URL}/cartproducts`,{params: { cart_id } }
  );
  console.log("Fetched cart products:", response.data);
  return response.data;
}

export async function addCartProduct(
  cart_id: number,
  product_id: number,
  quantity: number = 1
): Promise<CartProduct> {
  const response: AxiosResponse<CartProduct> = await axios.post(
    `${API_BASE_URL}/cartproducts`,
    { cart_id, product_id, quantity }
  );
  return response.data;
}

export async function updateCartProduct(
  cart_product_id: number,
  quantity: number
): Promise<CartProduct> {
  const response: AxiosResponse<CartProduct> = await axios.patch(
    `${API_BASE_URL}/cartproducts/${cart_product_id}/quantity`,
    { quantity }
  );
  return response.data;
}

export async function removeCartProduct(
  cart_product_id: number
): Promise<void> {
  await axios.delete(`${API_BASE_URL}/cartproducts/${cart_product_id}`);
}