import { PrismaClient } from "@prisma/client";
import { ClientAddressRepository } from "../clientAddress-repository";
import { ClientAddress } from "../../entities/clientAddress";
import { CreateClientAddressDTO } from "../../use-cases/create-clientAddress/create-clientAddress-dto";

export class PrismaClientAddressRepository implements ClientAddressRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(clientAddress: CreateClientAddressDTO): Promise<void> {
    await this.prisma.clientAddress.create({
      data: {
        clad_street: clientAddress.clad_street,
        clad_number: clientAddress.clad_number,
        clad_other: clientAddress.clad_other,
        clad_cep: clientAddress.clad_cep,
        clad_city: clientAddress.clad_city,
        clad_state: clientAddress.clad_state,
        client_id: clientAddress.client_id,
      },
    });
  }

  async read(): Promise<ClientAddress[]> {
    const clientAddress = await this.prisma.clientAddress.findMany();
    return clientAddress.map(
      (clientAddress: {
        clad_id: number;
        clad_street: string;
        clad_number: string;
        clad_other: string;
        clad_cep: string;
        clad_city: string;
        clad_state: string;
        client_id: number;
        created_at: Date;
        updated_at: Date;
      }) =>
        new ClientAddress(
          clientAddress.clad_id,
          clientAddress.clad_street,
          clientAddress.clad_number,
          clientAddress.clad_other,
          clientAddress.clad_cep,
          clientAddress.clad_city,
          clientAddress.clad_state,
          clientAddress.client_id,
          clientAddress.created_at,
          clientAddress.updated_at
        )
    );
  }

  async findById(id: number): Promise<ClientAddress | null> {
    const clientAddress = await this.prisma.clientAddress.findUnique({
      where: {
        clad_id: id,
      },
    });
    if (!clientAddress) {
      return null;
    }
    return new ClientAddress(
      clientAddress.clad_id,
      clientAddress.clad_street,
      clientAddress.clad_number,
      clientAddress.clad_other,
      clientAddress.clad_cep,
      clientAddress.clad_city,
      clientAddress.clad_state,
      clientAddress.client_id,
      clientAddress.created_at,
      clientAddress.updated_at
    );
  }

  async findByClientId(client_id: number): Promise<ClientAddress[]> {
    const clientAddress = await this.prisma.clientAddress.findMany({
      where: {
        client_id: client_id,
      },
    });
    return clientAddress.map(
      (clientAddress: {
        clad_id: number;
        clad_street: string;
        clad_number: string;
        clad_other: string;
        clad_cep: string;
        clad_city: string;
        clad_state: string;
        client_id: number;
        created_at: Date;
        updated_at: Date;
      }) =>
        new ClientAddress(
          clientAddress.clad_id,
          clientAddress.clad_street,
          clientAddress.clad_number,
          clientAddress.clad_other,
          clientAddress.clad_cep,
          clientAddress.clad_city,
          clientAddress.clad_state,
          clientAddress.client_id,
          clientAddress.created_at,
          clientAddress.updated_at
        )
    );
  }


  async update(clientAddress: ClientAddress): Promise<ClientAddress> {
    const updatedClientAddress = await this.prisma.clientAddress.update({
      where: {
        clad_id: clientAddress.clad_id,
      },
      data: {
        clad_street: clientAddress.clad_street,
        clad_number: clientAddress.clad_number,
        clad_other: clientAddress.clad_other,
        clad_cep: clientAddress.clad_cep,
        clad_city: clientAddress.clad_city,
        clad_state: clientAddress.clad_state,
        client_id: clientAddress.client_id,
      },
    });
    return new ClientAddress(
      updatedClientAddress.clad_id,
      updatedClientAddress.clad_street,
      updatedClientAddress.clad_number,
      updatedClientAddress.clad_other,
      updatedClientAddress.clad_cep,
      updatedClientAddress.clad_city,
      updatedClientAddress.clad_state,
      updatedClientAddress.client_id,
      updatedClientAddress.created_at,
      updatedClientAddress.updated_at
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.clientAddress.delete({
      where: {
        clad_id: id,
      },
    });
  }
}
