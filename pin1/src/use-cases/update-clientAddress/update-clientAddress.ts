import { ClientAddress } from "../../entities/clientAddress";
import { ClientAddressRepository } from "../../repositories/clientAddress-repository";
import { UpdateClientAddressDTO } from "./update-clientAddress-dto";

export interface UpdateClientAddressRequest {
  clad_id: number;
  clad_street: string;
  clad_number: string;
  clad_other: string;
  clad_cep: string;
  clad_city: string;
  clad_state: string;
  client_id: number;
}

export class UpdateClientAddress {
  private clientAddressRepository: ClientAddressRepository;

  constructor(clientAddressRepository: ClientAddressRepository) {
    this.clientAddressRepository = clientAddressRepository;
  }

  async execute({
    clad_id,
    clad_street,
    clad_number,
    clad_other,
    clad_cep,
    clad_city,
    clad_state,
    client_id,
  }: UpdateClientAddressRequest): Promise<ClientAddress> {
    if (!(await this.clientAddressRepository.findById(clad_id))) {
      throw new Error("ClientAddress not found");
    }
    if (!(await this.clientAddressRepository.findByClientId(client_id))) {
      throw new Error("Client not found");
    }
    const clientAddress: UpdateClientAddressDTO = {
      clad_id,
      clad_street,
      clad_number,
      clad_other,
      clad_cep,
      clad_city,
      clad_state,
      client_id,
    };
    return await this.clientAddressRepository.update(clientAddress);
  }
}
