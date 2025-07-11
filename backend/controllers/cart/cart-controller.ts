import { CartRepository } from "../../repositories/cart-repository";
import { Request, Response } from "express";
import { CreateCartDTO, UpdateCartDTO } from "./cart-dto";
import { CustomerRepository } from "../../repositories/customer-repository";

export class CartController {
  constructor(
    private repository: CartRepository,
    private customerRepository: CustomerRepository
  ) {}

  async create(req: Request, res: Response) {
    const customerId = Number(req.body.customer_id);
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Consumidor não encontrado." });
    }

    try {
      const createCart: CreateCartDTO = {
        customer_id: Number(req.body.customer_id),
      };
      const cart = await this.repository.create(createCart);
      return res.status(201).send(cart);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const cart_id = req.query.cart_id as string;
      const carts = await this.repository.read(
        isNaN(Number(cart_id)) || Number(cart_id) == 0
          ? undefined
          : Number(cart_id)
      );
      return res.status(200).json(carts);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async applyCoupon(req: Request, res: Response) {
    try {
      const cart_id = Number(req.params.cart_id);
      const coupon_code = String(req.body.coupon_code);
      const cart = await this.repository.applyCoupon(cart_id, coupon_code);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findByCustomerId(req: Request, res: Response) {
    try {
      const customer_id = Number(req.params.customer_id);
      const cart = await this.repository.findByCustomerId(customer_id);
      return cart
        ? res.status(200).json(cart)
        : res.status(404).json({ message: "Cart not found for this customer" });
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
      const existing = await this.repository.findById(req.body.cart_id);
      if (!existing) {
        throw new Error(
          "O ID fornecido não corresponde a nenhum carrinho existente."
        );
      }
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
