import { Request, Response } from "express";
import { DeleteItem } from "./delete-item";
import { PrismaClient } from "@prisma/client";
import { PrismaItemRepository } from "../../repositories/prisma/prisma-item-repository";
import { DeleteItemDTO } from "./delete-item-dto";

export class DeleteItemController {
  private deleteItem : DeleteItem 

  constructor(){
    this.deleteItem = new DeleteItem(
      new PrismaItemRepository(new PrismaClient())
    )
  } 


  async delete(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        await this.deleteItem.execute(Number(id));
        return res.json({id}).status(200).send();
    }catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
  }


}