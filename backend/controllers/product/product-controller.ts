import { Decimal } from "@prisma/client/runtime/library";
import { ProductRepository } from "../../repositories/product-repository";
import { Request, Response } from "express";
import { CreateProductDTO, UpdateProductDTO } from "./product-dto";

export class ProductController {
  private repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async create(req: Request, res: Response) {
    try {
      const createProduct: CreateProductDTO = {
        product_name: String(req.body.product_name),
        price: Decimal(req.body.price),
        image: String(req.body.image),
      };
      await this.repository.create(createProduct);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async read(req: Request, res: Response): Promise<Response> {
    try {
      const product_id = req.query.product_id as string;
      const products = await this.repository.read(
        isNaN(Number(product_id)) || Number(product_id) == 0 ? undefined : Number(product_id)
      );
      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { product_id } = req.params;
      const product = await this.repository.findById(Number(product_id));
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateProduct: UpdateProductDTO = {
        product_id: Number(req.params.product_id),
        product_name: String(req.body.product_name),
        price: Decimal(req.body.price),
        image: String(req.body.image),
      };
      const product = await this.repository.update(updateProduct);
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleteProduct = {
        product_id: Number(req.params.product_id),
      };
      await this.repository.delete(deleteProduct.product_id);

      return res.status(200).json(deleteProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
