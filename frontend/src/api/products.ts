import axios from "axios";
import type { AxiosResponse } from "axios";  

const API_BASE_URL = "http://localhost:3000/api";

export type Product = {
  product_id: number;
  product_name: string;
  price: number;
  image: string;
};

export async function getProducts() {
  const response: AxiosResponse<Product[]> = await axios.get(
    `${API_BASE_URL}/products`
  );
  return response.data;
}

export async function getProduct(product_id: number): Promise<Product | null> {
  const response: AxiosResponse<Product> = await axios.get(
    `${API_BASE_URL}/products/${product_id}`
  );
  return response.data;
}