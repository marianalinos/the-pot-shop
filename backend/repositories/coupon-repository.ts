import { Coupon } from "../models/coupon";
import {
  CreateCouponDTO,
  UpdateCouponDTO,
} from "../controllers/coupon/coupon-dto";

export interface CouponRepository {
  create(data: CreateCouponDTO): Promise<void>;
  read(type: number | undefined): Promise<Coupon[]>;
  findById(coupon_id: number): Promise<Coupon | null>;
  findByCode(code: string): Promise<Coupon | null>;
  update(data: UpdateCouponDTO): Promise<Coupon>;
  delete(coupon_id: number): Promise<void>;
}