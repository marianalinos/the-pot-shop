import axios from "axios";
import type { AxiosResponse } from "axios";  

const API_BASE_URL = "http://localhost:3000/api";

export type Product = {
  product_id: string;
  product_name: string;
  price: string;
  image: string;
};

export async function getProducts() {
  const response: AxiosResponse<Product[]> = await axios.get(
    `${API_BASE_URL}/products`
  );
  return response.data;
}