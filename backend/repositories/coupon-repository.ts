import { Coupon } from "../models/coupon";
import {
  CreateCouponDTO,
  UpdateCouponDTO,
} from "../controllers/coupon/coupon-dto";

export interface CouponRepository {
  create(coupon: CreateCouponDTO): Promise<void>;
  read(id: number | undefined): Promise<Coupon[]>;
  findById(id: number): Promise<Coupon | null>;
  findByCode(code: string): Promise<Coupon | null>;
  update(coupon: UpdateCouponDTO): Promise<Coupon>;
  delete(id: number): Promise<void>;
}