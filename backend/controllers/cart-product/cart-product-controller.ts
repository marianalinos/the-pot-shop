import { CartProductRepository } from "../../repositories/cart-product-repository";
import { Request, Response } from "express";
import { CreateCartProductDTO, UpdateCartProductDTO } from "./cart-product-dto";

export class CartProductController {
  private repository: CartProductRepository;

  constructor(repository: CartProductRepository) {
    this.repository = repository;
  }

  async create(req: Request, res: Response) {
    try {
      const createCartProduct: CreateCartProductDTO = {
        cart_id: Number(req.body.cart_id),
        product_id: Number(req.body.product_id),
        quantity: Number(req.body.quantity) || 1,
      };
      const cartProduct = await this.repository.create(createCartProduct);
      return res.status(201).json(cartProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const cart_id = req.query.cart_id as string;
      const cartProducts = await this.repository.read(
        isNaN(Number(cart_id)) || Number(cart_id) == 0 ? undefined : Number(cart_id)
      );
      return res.status(200).json(cartProducts);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { cart_product_id } = req.params;
      const cartProduct = await this.repository.findById(Number(cart_product_id));
      if (!cartProduct) {
        return res.status(404).json({ message: "Cart product not found" });
      }
      return res.status(200).json(cartProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateCartProduct: UpdateCartProductDTO = {
        cart_product_id: Number(req.params.cart_product_id),
        product_id: Number(req.body.product_id),
        quantity: Number(req.body.quantity),
      };
      const cartProduct = await this.repository.update(updateCartProduct);
      return res.status(200).json(cartProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateQuantity(req: Request, res: Response) {
    try {
      const cart_product_id = Number(req.params.cart_product_id);
      const quantity = Number(req.body.quantity);
      if (isNaN(cart_product_id) || isNaN(quantity)) {
        return res.status(400).json({ message: "Invalid cart product ID or quantity" });
      }
      const cartProduct = await this.repository.updateQuantity(cart_product_id, quantity);
      return res.status(200).json(cartProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.repository.delete(Number(req.params.cart_product_id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
