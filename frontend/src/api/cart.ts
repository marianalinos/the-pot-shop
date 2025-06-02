import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export type Cart = {
  cart_id: number;
  total: number;
  coupon_code?: string | null;
  customer_id?: number | null;
};

export async function createCart(customer_id?: number): Promise<Cart> {
  console.log("Creating cart for customer_id:", customer_id);
  const response: AxiosResponse<Cart> = await axios.post(
    `${API_BASE_URL}/carts`,
    {
      customer_id,
    }
  );
  console.log("Cart created successfully:", response.data);
  return response.data;
}

export async function getCart(cart_id: number): Promise<Cart> {
  const response: AxiosResponse<Cart> = await axios.get(
    `${API_BASE_URL}/carts/${cart_id}`
  );
  return response.data;
}

export async function getCustomerCart(
  customer_id: number
): Promise<Cart | null> {
  try {
    console.log("Fetching cart for customer_id:", customer_id);
    const response: AxiosResponse<Cart> = await axios.get(
      `${API_BASE_URL}/carts/customer/${customer_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function applyCouponToCart(
  cart_id: number, 
  coupon_code: string
): Promise<Cart | null> {
  //   const response: AxiosResponse<Cart> = await axios.get(
  //     `${API_BASE_URL}/carts/customer/${customer_id}`
  //   );
  //   return response.data;
  // } catch (error) {
  //   if (axios.isAxiosError(error) && error.response?.status === 404) {
  //     return null;
  //   }
  //   throw error;
  new Object({cart_id,coupon_code});
  return {} as Cart
}
