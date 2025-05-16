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
      const createDto: CreateCartProductDTO = {
        cartId: Number(req.body.cartId),
        productId: Number(req.body.productId),
        quantity: Number(req.body.quantity) || 1,
      };
      const cartProduct = await this.repository.create(createDto);
      return res.status(201).json(cartProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as string;
      const cartProducts = await this.repository.read(
        isNaN(Number(id)) || Number(id) == 0 ? undefined : Number(id)
      );
      return res.status(200).json(cartProducts);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cartProduct = await this.repository.findById(Number(id));
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
      const updateDto: UpdateCartProductDTO = {
        id: Number(req.params.id),
        quantity: Number(req.body.quantity),
      };
      const cartProduct = await this.repository.update(updateDto);
      return res.status(200).json(cartProduct);
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
}
