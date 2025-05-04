import { ClientAddress } from "../entities/clientAddress";
import { CreateClientAddressDTO } from "../use-cases/create-clientAddress/create-clientAddress-dto";
import { UpdateClientAddressDTO } from "../use-cases/update-clientAddress/update-clientAddress-dto";

export interface ClientAddressRepository {
  create(clientAddress: CreateClientAddressDTO): Promise<void>;
  read(): Promise<ClientAddress[]>;
  findById(id: number): Promise<ClientAddress | null>;
  findByClientId(client_id: number): Promise<ClientAddress[]>;
  update(clientAddress: UpdateClientAddressDTO): Promise<ClientAddress>
  delete(id: number): Promise<void>;
}