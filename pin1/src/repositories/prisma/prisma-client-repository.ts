import { Client } from '../../entities/client';
import { CreateClientDTO } from '../../use-cases/create-client/create-client-dto';
import { UpdateClientDTO } from '../../use-cases/update-client/update-client.dto';
import { ClientRepository } from '../client-repository';
import { PrismaClient } from '@prisma/client';

export class PrismaClientRepository implements ClientRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(client: CreateClientDTO): Promise<void> {
		await this.prisma.client.create({
			data: {
				clie_age: client.age,
				user_id: client.user_id,
				created_at: new Date(),
				updated_at: new Date(),
			},
		});
	}

	async findByUserId(user_id: number): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        user_id,
      },
    });
    if (!client) {
      return null;
    }
    return new Client(
      client.clie_id,
      client.clie_age,
      client.user_id,
      client.created_at,
      client.updated_at,
    );
  }

	async findById(id: number): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        clie_id: id,
      },
    });
    if (!client) {
      return null;
    }
    return new Client(
      client.clie_id,
      client.clie_age,
      client.user_id,
      client.created_at,
      client.updated_at,
    );
  }

	async read(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany();
    return clients.map(
      (client) =>
        new Client(
          client.clie_id,
          client.clie_age,
          client.user_id,
          client.created_at,
          client.updated_at,
        ),
    );
	}

	async update(client: UpdateClientDTO): Promise<Client> {
    const updatedClient = await this.prisma.client.update({
      where: {
        clie_id: client.id,
      },
      data: {
        clie_age: client.age,
        updated_at: new Date(),
      },
    });
    return new Client(
      updatedClient.clie_id,
      updatedClient.clie_age,
      updatedClient.user_id,
      updatedClient.created_at,
      updatedClient.updated_at,
    );
  }

	async delete(id: number): Promise<void> {
    await this.prisma.client.delete({
      where: {
        clie_id: id,
      },
    });
  }
}
