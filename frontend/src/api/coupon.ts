import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export type Coupon = {
  coupon_id: number;
  code: string;
  discount: string | null;
  expiration?: Date | null;
  used: boolean;
};

export async function getCouponDiscountByCode(couponCode: string): Promise<number | null> {
  try {
    const response: AxiosResponse<Coupon> = await axios.get(
      `${API_BASE_URL}/coupons/code/${couponCode}`
    );
    console.log("Coupon fetched successfully:", response.data.discount);
    return response.data.discount ? Number(response.data.discount) : null;
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return null;
  }
}