import axios from "axios";
import type { AxiosResponse } from "axios";  

const API_BASE_URL = "http://localhost:3000/api";

export type CartProduct = {
    cart_product_id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
};

export async function addCartProduct(
  cart_id: number,
  product_id: number,
  quantity: number
): Promise<CartProduct> {
  const response: AxiosResponse<CartProduct> = await axios.post(
    `${API_BASE_URL}/cartproducts`,
    {
      cart_id,
      product_id,
      quantity,
    }
  );
  return response.data;
}

export async function getCartProducts() {
  const response: AxiosResponse<CartProduct[]> = await axios.get(
    `${API_BASE_URL}/cartproducts`
  );
  return response.data;
}