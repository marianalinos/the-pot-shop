import { ClientAddress } from "../../entities/clientAddress";
import { ClientAddressRepository } from "../../repositories/clientAddress-repository";

export class ReadClientAddress {
  private clientAddressRepository: ClientAddressRepository;

  constructor(clientAddressRepository: ClientAddressRepository) {
    this.clientAddressRepository = clientAddressRepository;
  }
  async execute(): Promise<ClientAddress[]> {
    return await this.clientAddressRepository.read();
  }
  async findByClientId(client_id: number): Promise<ClientAddress[]> {
    return await this.clientAddressRepository.findByClientId(client_id);
  }
}
