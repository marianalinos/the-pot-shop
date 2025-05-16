export interface CreateCartDTO {
  couponCode?: string | null;
  customerId?: number | null;
}

export interface UpdateCartDTO {
  id: number;
  couponCode?: string | null;
  customerId?: number | null;
}