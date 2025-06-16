export interface CreateCouponDTO {
    code: string;
    discount: number;
    expiration?: string | Date;
    used?: boolean;
}
export interface UpdateCouponDTO {
    coupon_id: number;
    code: string;
    discount: number;
    expiration?: string | Date;
    used?: boolean;
}