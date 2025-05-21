import { CartRepository } from "../../repositories/cart-repository";
import { Request, Response } from "express";
import { CreateCartDTO, UpdateCartDTO } from "./cart-dto";

export class CartController {
  constructor(private repository: CartRepository) {}

  async create(req: Request, res: Response) {
    try {
      const createCart: CreateCartDTO = {
        coupon_code: String(req.body.coupon_code),
        customer_id: Number(req.body.customer_id),
      };
      await this.repository.create(createCart);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const cart_id = req.query.cart_id as string;
      const carts = await this.repository.read(
        isNaN(Number(cart_id)) || Number(cart_id) == 0 ? undefined : Number(cart_id)
      );
      return res.status(200).json(carts);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const cart = await this.repository.findById(Number(req.params.cart_id));
      return cart
        ? res.status(200).json(cart)
        : res.status(404).json({ message: "Cart not found" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCart: UpdateCartDTO = {
        cart_id: Number(req.params.cart_id),
        coupon_code: String(req.body.coupon_code),
        customer_id: Number(req.body.customer_id),
      };
      const cart = await this.repository.update(updateCart);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.repository.delete(Number(req.params.cart_id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async calculateTotal(req: Request, res: Response) {
    try {
      const { cart_id } = req.params;
      const total = await this.repository.calculateTotal(Number(cart_id));
      return res.status(200).json({ total });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
