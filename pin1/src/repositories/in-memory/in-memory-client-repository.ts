import { Client } from "../../entities/client";
import { CreateClientDTO } from "../../use-cases/create-client/create-client-dto";
import { UpdateClientDTO } from "../../use-cases/update-client/update-client.dto";
import { ClientRepository } from "../client-repository";

export class InMemoryClientRepository implements ClientRepository {
  
  private clients: Client[] = [];

  constructor(clients: Client[] = []){
      this.clients = clients;
  }

  async create(client: CreateClientDTO): Promise<void> {
    const newClient = new Client(
      this.clients.length + 1,
      client.user_id,
      client.age,
      new Date(),
      new Date(),
    )
    this.clients.push(newClient);
  }
  
  async findByUserId(user_id: number): Promise<Client | null> {
    const client = this.clients.find(client => client.getUserId() === user_id);
    return client ?? null;
  }
  
  async findById(id: number): Promise<Client | null> {
    const client = this.clients.find(client => client.getId() === id);
    return client ?? null;
  }
  
  async read(): Promise<Client[]> {
    return this.clients;
  }
  
  async update(client: UpdateClientDTO): Promise<Client> {
    const currentClient = this.clients.find(clientRepo => clientRepo.getId() === client.id);
    const index = this.clients.findIndex(clientRepo => clientRepo.getId() === client.id);
    const newClient = new Client(
      client.id,
      currentClient?.getUserId() ?? 0,
      client.age,
      new Date(),
      currentClient?.getCreatedAt() ?? new Date(),
    );
    this.clients[index] = newClient;
    return newClient;
  }
  
  async delete(id: number): Promise<void> {
    const index = this.clients.findIndex(client => client.getId() === id);
    this.clients.splice(index, 1);
  }

}