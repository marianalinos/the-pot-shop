import { Client } from '../entities/client';
import { CreateClientDTO } from '../use-cases/create-client/create-client-dto';
import { UpdateClientDTO } from '../use-cases/update-client/update-client.dto';

export interface ClientRepository {
	create(client: CreateClientDTO): Promise<void>;
	findByUserId(user_id: number): Promise<Client | null>;
	findById(id: number): Promise<Client | null>;
	read(): Promise<Client[]>;
	update(client: UpdateClientDTO): Promise<Client>;
	delete(id: number): Promise<void>;
}
