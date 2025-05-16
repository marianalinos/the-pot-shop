import { CartRepository } from "../../repositories/cart-repository";
import { Request, Response } from "express";
import { CreateCartDTO, UpdateCartDTO } from "./cart-dto";

export class CartController {
  constructor(private repository: CartRepository) {}

  async create(req: Request, res: Response) {
    try {
      const createCartRequest: CreateCartDTO = {
        couponCode: String(req.body.couponCode),
        customerId: Number(req.body.customerId),
      };
      await this.repository.create(createCartRequest);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as string;
      const carts = await this.repository.read(
        isNaN(Number(id)) || Number(id) == 0 ? undefined : Number(id)
      );
      return res.status(200).json(carts);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const cart = await this.repository.findById(Number(req.params.id));
      return cart
        ? res.status(200).json(cart)
        : res.status(404).json({ message: "Cart not found" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCartRequest: UpdateCartDTO = {
        id: Number(req.params.id),
        couponCode: String(req.body.couponCode),
        customerId: Number(req.body.customerId),
      };
      const cart = await this.repository.update(updateCartRequest);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.repository.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async calculateTotal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const total = await this.repository.calculateTotal(Number(id));
      return res.status(200).json({ total });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
