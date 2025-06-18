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

  async create(data: CreateCouponDTO): Promise<void> {
    const existing = await this.findByCode(data.code);
    if (existing) {
      throw new Error("Já existe um cupom com esse código");
    }
    if (data.discount < 0) {
      throw new Error("O valor do desconto deve ser positivo");
    }
    const newCoupon = new Coupon(
      this.coupons.length + 1,
      data.code,
      data.discount,
      data.expiration ? new Date(data.expiration) : null,
      data.used ?? false
    );

    this.coupons.push(newCoupon);
  }

  async read(type?: number): Promise<Coupon[]> {
    if (type !== undefined) {
      return this.coupons.filter((c) => c.getId() === type);
    }
    return this.coupons;
  }

  async findById(coupon_id: number): Promise<Coupon | null> {
    const coupon = this.coupons.find((c) => c.getId() === coupon_id);
    return coupon ?? null;
  }

  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = this.coupons.find((c) => c.getCode() === code);
    return coupon ?? null;
  }

  async update(data: UpdateCouponDTO): Promise<Coupon> {
    const index = this.coupons.findIndex((c) => c.getId() === data.coupon_id);
    if (index === -1) throw new Error("Coupon not found");

    const updatedCoupon = new Coupon(
      data.coupon_id,
      data.code,
      data.discount,
      data.expiration ? new Date(data.expiration) : null,
      data.used ?? false
    );

    this.coupons[index] = updatedCoupon;
    return updatedCoupon;
  }

  async delete(coupon_id: number): Promise<void> {
    const index = this.coupons.findIndex((c) => c.getId() === coupon_id);
    if (index !== -1) {
      this.coupons.splice(index, 1);
    }
  }

    async disable(coupon_code: string): Promise<Coupon> {
    const index = this.coupons.findIndex((c) => c.getCode() === coupon_code);
    if (index === -1) {
      throw new Error("Coupon not found");
    }
    const coupon = this.coupons[index];
    const disabledCoupon = new Coupon(
      coupon.getId(),
      coupon.getCode(),
      coupon.getDiscount(),
      coupon.getExpiration(),
      true
    );
    this.coupons[index] = disabledCoupon;
    return disabledCoupon;
  }
}
