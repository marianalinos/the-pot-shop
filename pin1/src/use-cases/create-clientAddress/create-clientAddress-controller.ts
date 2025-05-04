import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  CreateClientAddress,
  CreateClientAddressRequest,
} from "./create-clientAddress";
import { PrismaClientAddressRepository } from "../../repositories/prisma/prisma-clientAddress-repository";

export class CreateClientAddressController {
  private createClientAddress: CreateClientAddress;
  constructor() {
    this.createClientAddress = new CreateClientAddress(
      new PrismaClientAddressRepository(new PrismaClient())
    );
  }

  async create(req: Request, res: Response) {
    try {
      const createClientAddressRequest: CreateClientAddressRequest = {
        clad_street: String(req.body.clad_street),
        clad_number: String(req.body.clad_number),
        clad_other: String(req.body.clad_other),
        clad_cep: String(req.body.clad_cep),
        clad_city: String(req.body.clad_city),
        clad_state: String(req.body.clad_state),
        client_id: Number(req.body.client_id),
      };
      await this.createClientAddress.execute(createClientAddressRequest);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
