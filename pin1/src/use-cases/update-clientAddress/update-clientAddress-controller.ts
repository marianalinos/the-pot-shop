import { Request, Response } from "express";
import { UpdateClientAddress } from "./update-clientAddress";
import { PrismaClient } from "@prisma/client";
import { PrismaClientAddressRepository } from "../../repositories/prisma/prisma-clientAddress-repository";


export class UpdateClientAddressController {
  private updateClientAddress: UpdateClientAddress;

  constructor() {
    this.updateClientAddress = new UpdateClientAddress(
      new PrismaClientAddressRepository(new PrismaClient())
    );
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { clad_id } = req.params;
      const {
        clad_street,
        clad_number,
        clad_other,
        clad_cep,
        clad_city,
        clad_state,
        client_id,
      } = req.body;
      const clientAddress = await this.updateClientAddress.execute({
        clad_id: Number(clad_id),
        clad_street: String(clad_street),
        clad_number: String(clad_number),
        clad_other: String(clad_other),
        clad_cep: String(clad_cep),
        clad_city: String(clad_city),
        clad_state: String(clad_state),
        client_id: Number(client_id),
      });
      return res.status(200).json(clientAddress);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}