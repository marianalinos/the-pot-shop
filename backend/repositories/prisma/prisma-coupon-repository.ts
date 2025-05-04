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

  async create(coupon: CreateCouponDTO): Promise<void> {
    await this.prisma.coupon.create({
      data: {
        code: coupon.code,
        discount: coupon.discount,
        expiration: coupon.expiration,
        used: coupon.used
      },
    });
  }

  async read(id: number | undefined): Promise<Coupon[]> {
    const coupons = await this.prisma.coupon.findMany({
      where: id !== undefined ? { id } : {},
    });

    return coupons.map(
      (coupon) => new Coupon(coupon.id, coupon.code, coupon.discount)
    );
  }

  async findById(id: number): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        id: id,
      },
    });

    if (!coupon) return null;

    return new Coupon(coupon.id, coupon.code, coupon.discount);
  }

  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code: code,
      },
    });

    if (!coupon) return null;

    return new Coupon(coupon.id, coupon.code, coupon.discount);
  }

  async update(coupon: UpdateCouponDTO): Promise<Coupon> {
    const updated = await this.prisma.coupon.update({
      where: {
        id: coupon.id,
      },
      data: {
        code: coupon.code,
        discount: coupon.discount,
        expiration: coupon.expiration,
        used: coupon.used
      },
    });

    return new Coupon(updated.id, updated.code, updated.discount);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.coupon.delete({
      where: {
        id: id,
      },
    });
  }
}
