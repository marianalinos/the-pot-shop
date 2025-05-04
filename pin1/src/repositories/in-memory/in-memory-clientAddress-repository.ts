import { ClientAddress } from '../../entities/clientAddress';
import { CreateClientAddressDTO } from '../../use-cases/create-clientAddress/create-clientAddress-dto';
import { UpdateClientAddressDTO  } from '../../use-cases/update-clientAddress/update-clientAddress-dto';
import { ClientAddressRepository } from '../clientAddress-repository';

export class InMemoryClientAddressRepository implements ClientAddressRepository {
  private clientAddress: ClientAddress[] = [];

  constructor(clientAddress: ClientAddress[] = []) {
    this.clientAddress = clientAddress;
  }

  async create(clientAddress: CreateClientAddressDTO): Promise<void> {
    const newClientAddress = new ClientAddress(
      this.clientAddress.length + 1,
      clientAddress.clad_street,
      clientAddress.clad_number,
      clientAddress.clad_other,
      clientAddress.clad_cep,
      clientAddress.clad_city,
      clientAddress.clad_state,
      clientAddress.client_id,
      new Date(),
      new Date()
    );
    this.clientAddress.push(newClientAddress);
  }

  async read(): Promise<ClientAddress[]> {
    return this.clientAddress;
  }

  async findById(id: number): Promise<ClientAddress | null> {
    const clientAddress = this.clientAddress.find((clientAddress) => clientAddress.clad_id === id);
    return clientAddress || null;
  }

  async findByClientId(client_id: number): Promise<ClientAddress[]> {
    const clientAddress = this.clientAddress.filter((clientAddress) => clientAddress.client_id === client_id);
    return clientAddress;
  }

  async update(clientAddress: UpdateClientAddressDTO): Promise<ClientAddress> {
    const index = this.clientAddress.findIndex(
      clientAddressRepository => clientAddressRepository.clad_id === clientAddress.clad_id
    )
    const newClientAddress = new ClientAddress(
      clientAddress.clad_id,
      clientAddress.clad_street,
      clientAddress.clad_number,
      clientAddress.clad_other,
      clientAddress.clad_cep,
      clientAddress.clad_city,
      clientAddress.clad_state,
      clientAddress.client_id,
      new Date(),
      this.clientAddress[index].created_at
    );
    this.clientAddress[index] = newClientAddress;
    return newClientAddress;
    }

  async delete(id: number): Promise<void> {
    const index = this.clientAddress.findIndex(
      clientAddressRepository => clientAddressRepository.clad_id === id
    )
    this.clientAddress.splice(index, 1);
  }

}