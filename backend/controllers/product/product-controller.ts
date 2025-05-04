import { Decimal } from "@prisma/client/runtime/library";
import { ProductRepository } from "../../repositories/product-repository";
import { Request, Response } from "express";
import {
  CreateProductDTO,
  UpdateProductDTO,
  DeleteProductDTO,
} from "./product-dto";

export class ProductController {
  private repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async create(req: Request, res: Response) {
    try {
      const createProductRequest: CreateProductDTO = {
        name: String(req.body.name),
        price: Decimal(req.body.price),
        image: String(req.body.image),
      };
      await this.repository.create(createProductRequest);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async read(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as string;
      const products = await this.repository.read(
        isNaN(Number(id)) || Number(id) == 0 ? undefined : Number(id)
      );
      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await this.repository.findById(Number(id));
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateProductRequest: UpdateProductDTO = {
        id: Number(req.params.id),
        name: String(req.body.name),
        price: Decimal(req.body.price),
        image: String(req.body.image),
      };
      const product = await this.repository.update(updateProductRequest);
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleteProductRequest: DeleteProductDTO = {
        id: Number(req.params.id)
      };
      const product = await this.repository.delete(Number(deleteProductRequest));
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
