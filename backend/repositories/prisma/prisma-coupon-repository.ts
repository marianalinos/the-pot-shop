import { PrismaClient } from "@prisma/client";
import { CouponRepository } from "../coupon-repository";
import { Coupon } from "../../models/coupon";
import {
  CreateCouponDTO,
  UpdateCouponDTO,
} from "../../controllers/coupon/coupon-dto";

export class PrismaCouponRepository implements CouponRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateCouponDTO): Promise<void> {
    await this.prisma.coupon.create({
      data: {
        code: data.code,
        discount: data.discount,
        expiration: data.expiration,
        used: data.used,
      },
    });
  }

  async read(type: number | undefined): Promise<Coupon[]> {
    const coupons = await this.prisma.coupon.findMany({
      where: type !== undefined ? { coupon_id: type } : {},
    });

    return coupons.map(
      (coupon) => new Coupon(coupon.coupon_id, coupon.code, coupon.discount)
    );
  }

  async findById(coupon_id: number): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        coupon_id: coupon_id,
      },
    });

    if (!coupon) return null;

    return new Coupon(coupon.coupon_id, coupon.code, coupon.discount);
  }

  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code: code,
      },
    });

    if (!coupon) return null;

    return new Coupon(coupon.coupon_id, coupon.code, coupon.discount, coupon.expiration, coupon.used);
  }

  async update(data: UpdateCouponDTO): Promise<Coupon> {
    const updated = await this.prisma.coupon.update({
      where: {
        coupon_id: data.coupon_id,
      },
      data: {
        code: data.code,
        discount: data.discount,
        expiration: data.expiration,
        used: data.used,
      },
    });

    return new Coupon(updated.coupon_id, updated.code, updated.discount);
  }

  async delete(coupon_id: number): Promise<void> {
    await this.prisma.coupon.delete({
      where: {
        coupon_id: coupon_id,
      },
    });
  }

  async disable(coupon_code: string): Promise<Coupon> {
    const coupon = await this.prisma.coupon.update({
      where: {
        code: coupon_code,
      },
      data: {
        used: true,
      },
    }); 
    console.log(coupon)


    return new Coupon(coupon.coupon_id, coupon.code, coupon.discount);
  }
}
