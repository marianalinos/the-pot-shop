import { Decimal } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { CouponRepository } from "../../repositories/coupon-repository";
import { CreateCouponDTO, UpdateCouponDTO } from "./coupon-dto";

export class CouponController {
  private repository: CouponRepository;

  constructor(repository: CouponRepository) {
    this.repository = repository;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createCoupon: CreateCouponDTO = {
        code: String(req.body.code),
        discount: new Decimal(req.body.discount),
        expiration: req.body.expiration
          ? new Date(req.body.expiration)
          : undefined,
        used: req.body.used ?? false,
      };

      await this.repository.create(createCoupon);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const coupon_id = req.query.coupon_id as string;
      const coupons = await this.repository.read(
        isNaN(Number(coupon_id)) || Number(coupon_id) === 0 ? undefined : Number(coupon_id)
      );
      return res.status(200).json(coupons);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { coupon_id } = req.params;
      const coupon = await this.repository.findById(Number(coupon_id));
      return res.status(200).json(coupon);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findByCode(req: Request, res: Response): Promise<Response> {
    try {
      const { code } = req.params;
      const coupon = await this.repository.findByCode(code);
      return res.status(200).json(coupon);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCoupon: UpdateCouponDTO = {
        coupon_id: Number(req.params.coupon_id),
        code: String(req.body.code),
        discount: new Decimal(req.body.discount),
        expiration: req.body.expiration
          ? new Date(req.body.expiration)
          : undefined,
        used: req.body.used ?? false,
      };

      const updatedCoupon = await this.repository.update(updateCoupon);
      return res.status(200).json(updatedCoupon);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const coupon_id = Number(req.params.coupon_id);
      await this.repository.delete(coupon_id);
      return res.status(200).json({ coupon_id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
