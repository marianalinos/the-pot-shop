import {Request , Response} from 'express';
import {CreateItem} from './create-item';
import { PrismaItemRepository } from '../../repositories/prisma/prisma-item-repository';
import { PrismaClient } from '@prisma/client';

export class CreateItemController{
  private createItem: CreateItem;

  constructor(){
   this.createItem = new CreateItem(
      new PrismaItemRepository(new PrismaClient()),
  );;
  }

  async create(req: Request, res: Response): Promise<Response>{
      try{
        const createItemRequest = {
          prod_id: Number(req.body.prod_id),
          cart_id: Number(req.body.cart_id),

        };
        await this.createItem.execute(createItemRequest);
        return res.status(201).send();
      }catch(err){
        return res.status(400).json({
          message: 'Unexpected error on create item'
        })
      }
  }
}