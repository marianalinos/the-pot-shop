import { Request , Response} from 'express';
import { ReadItem } from './read-item';
import { PrismaItemRepository } from '../../repositories/prisma/prisma-item-repository';
import { PrismaClient } from '@prisma/client';



export class ReadItemController{

  private readItem : ReadItem
  constructor(){
    this.readItem = new ReadItem(
      new PrismaItemRepository(new PrismaClient()),
  );  }
 

  async read(req : Request, res : Response): Promise<Response>{
    try{
      const items = await this.readItem.execute()
      return res.status(200).json(items)
    }catch(err){
      return res.status(400).json({
        message: 'Unexpected Error'
      })
    }
  }

  async readByCartId(req : Request, res : Response): Promise<Response>{
    try{
      const { cart_id } = req.params
      const items = await this.readItem.readByCartId(Number(cart_id))
      return res.status(200).json(items)
    }catch(err){
      return res.status(400).json({
        message: 'Unexpected Error'
      })
    }
  }
}
