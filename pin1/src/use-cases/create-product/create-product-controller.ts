import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository";
import { CreateProduct} from "./create-product";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class CreateProductController {
  private createProduct: CreateProduct;
	constructor() {
		this.createProduct = new CreateProduct(
			new PrismaProductRepository(new PrismaClient()),
		);
	}

	async create(req: Request, res: Response) {
    try {
      const createProductRequest = {
        name: String(req.body.name),
        price: Number(req.body.price),
        img: String(req.body.img),
        type: Number(req.body.type),
        cata_id: Number(req.body.cata_id),
        prod_desc: String(req.body.prod_desc),
      };
      await this.createProduct.execute(createProductRequest);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
      
     
  }

}
}