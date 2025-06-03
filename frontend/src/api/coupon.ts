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

export async function getCouponByCode(couponCode: string): Promise<Coupon | null> {
  try {
    const response: AxiosResponse<Coupon> = await axios.get(
      `${API_BASE_URL}/coupons/code/${couponCode}`
    );
    console.log("Coupon fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return null;
  }
}

export async function getCouponDiscountByCode(couponCode: string): Promise<number | null> {
  const coupon = await getCouponByCode(couponCode);
  if (!coupon) {
    console.error("Coupon not found.");
    return null;
  }
  return coupon.discount ? Number(coupon.discount) : null;
}

export async function disableCoupon(couponCode: string): Promise<void> {
  try {
    await axios.patch(`${API_BASE_URL}/coupons/${couponCode}/disable`);
    console.log(`Coupon ${couponCode} disabled successfully.`);
  } catch (error) {
    console.error(`Error disabling coupon ${couponCode}:`, error);
  }
}