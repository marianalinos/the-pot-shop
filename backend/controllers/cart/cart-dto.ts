export interface CreateCartDTO {
  coupon_code?: string | null;
  customer_id?: number | null;
}

export interface UpdateCartDTO {
  cart_id: number;
  coupon_code?: string | null;
  customer_id?: number | null;
}