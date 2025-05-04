import { Decimal } from "@prisma/client/runtime/library";

export interface CreateCouponDTO {
    code: string;
    discount: Decimal;
    expiration?: string | Date;
    used?: boolean;
}
export interface UpdateCouponDTO {
    id: number;
    code: string;
    discount: Decimal;
    expiration?: string | Date;
    used?: boolean;
}