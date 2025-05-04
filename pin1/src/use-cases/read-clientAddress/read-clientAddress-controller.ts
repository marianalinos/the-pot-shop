import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientAddressRepository } from "../../repositories/prisma/prisma-clientAddress-repository";
import { ReadClientAddress } from "./read-clientAddress";

export class ReadClientAddressController{
  private readClientAddress: ReadClientAddress;
  
  constructor(){
    this.readClientAddress = new ReadClientAddress(
      new PrismaClientAddressRepository(new PrismaClient()),
    );
  }

  async read(req: Request, res: Response): Promise<Response>{
    try{
      const clientAddress = await this.readClientAddress.execute();
      return res.status(200).json(clientAddress);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findByClientId(req: Request, res: Response): Promise<Response>{
    try{
      const { client_id } = req.params;
      const clientAddress = await this.readClientAddress.findByClientId(Number(client_id));
      return res.status(200).json(clientAddress);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
} 