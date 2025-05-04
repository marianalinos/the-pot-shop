import { Request, Response } from 'express';
import { ReadProduct } from './read-product';
import { PrismaProductRepository } from '../../repositories/prisma/prisma-product-repository';
import { PrismaClient } from '@prisma/client';

export class ReadProductController {
	private readProduct: ReadProduct;

	constructor() {
		this.readProduct = new ReadProduct(
			new PrismaProductRepository(new PrismaClient()),
		);
	}

	async read(req: Request, res: Response): Promise<Response> {
		try {
			const type = req.query.type as string;
			const products = await this.readProduct.read(
				(isNaN(Number(type)) || Number(type) == 0) ? undefined : Number(type),
			);
			return res.status(200).json(products);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async readById(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const product = await this.readProduct.readById(Number(id));
			return res.status(200).json(product);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
