import { Request , Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaItemRepository } from '../../repositories/prisma/prisma-item-repository';
import { UpdateItem } from './update-item';

export class UpdateItemController {
	private updateItem: UpdateItem;
	constructor() {
		this.updateItem = new UpdateItem(
			new PrismaItemRepository(new PrismaClient())
		);
	}
 
  async update(req : Request, res : Response) : Promise<Response> {
    try {
			const { id } = req.params;
			const { id_cart } = req.body;
      const { id_product } = req.body;
			const item = await this.updateItem.execute({
				id: Number(id),
        id_cart: Number(id_cart),
        id_product: Number(id_product)
      });
			return res.status(200).json(item);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}

  }
}