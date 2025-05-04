import { Coupon } from "../../models/coupon";
import { CouponRepository } from "../coupon-repository";
import {
  CreateCouponDTO,
  UpdateCouponDTO,
} from "../../controllers/coupon/coupon-dto";

export class InMemoryCouponRepository implements CouponRepository {
  private coupons: Coupon[] = [];

  constructor(coupons: Coupon[] = []) {
    this.coupons = coupons;
  }

  async create(coupon: CreateCouponDTO): Promise<void> {
    const newCoupon = new Coupon(
      this.coupons.length + 1,
      coupon.code,
      coupon.discount,
      coupon.expiration ? new Date(coupon.expiration) : null,
      coupon.used ?? false
    );
    this.coupons.push(newCoupon);
  }

  async read(id?: number): Promise<Coupon[]> {
    if (id !== undefined) {
      return this.coupons.filter((c) => c.getId() === id);
    }
    return this.coupons;
  }

  async findById(id: number): Promise<Coupon | null> {
    const coupon = this.coupons.find((c) => c.getId() === id);
    return coupon ?? null;
  }

  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = this.coupons.find((c) => c.getCode() === code);
    return coupon ?? null;
  }

  async update(coupon: UpdateCouponDTO): Promise<Coupon> {
    const index = this.coupons.findIndex((c) => c.getId() === coupon.id);
    if (index === -1) throw new Error("Coupon not found");

    const updatedCoupon = new Coupon(
      coupon.id,
      coupon.code,
      coupon.discount,
      coupon.expiration ? new Date(coupon.expiration) : null,
      coupon.used ?? false
    );

    this.coupons[index] = updatedCoupon;
    return updatedCoupon;
  }

  async delete(id: number): Promise<void> {
    const index = this.coupons.findIndex((c) => c.getId() === id);
    if (index !== -1) {
      this.coupons.splice(index, 1);
    }
  }
}
