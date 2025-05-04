import { Request, Response } from "express";
import { UpdateProduct } from "./update-product";
import { PrismaClient } from "@prisma/client";
import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository";

export class UpdateProductController {
  private updateProduct: UpdateProduct;

  constructor() {
    this.updateProduct = new UpdateProduct(new PrismaProductRepository(new PrismaClient()));
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.updateProduct.update(req.body);
      return res.status(200).json(product);
    } catch (error : any) {
        return res.status(400).json({ message: error.message });
      }
    }
  }