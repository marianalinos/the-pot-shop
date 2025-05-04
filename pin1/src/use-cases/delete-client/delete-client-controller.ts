import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientRepository } from "../../repositories/prisma/prisma-client-repository";
import { DeleteClient } from "./delete-client";

export class DeleteClientController {

  private deleteClient: DeleteClient;

  constructor() {
    this.deleteClient = new DeleteClient(
      new PrismaClientRepository(new PrismaClient())
    );
  } 

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteClient.execute(Number(id));
      return res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }


}