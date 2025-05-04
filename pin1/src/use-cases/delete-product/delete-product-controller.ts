import { Request, Response } from "express";
import { DeleteProduct } from "./delete-product";
import { PrismaClient } from "@prisma/client";
import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository";

export class DeleteProductController {
  private deleteProduct: DeleteProduct;

  constructor() {
    this.deleteProduct = new DeleteProduct(new PrismaProductRepository(new PrismaClient()));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.deleteProduct.execute(Number(req.params.id));
      return res.status(200).json(product);
    } catch (error : any) {
        return res.status(400).json({ message: error.message });
      }
    }
  }