import { ClientAddressRepository } from "../../repositories/clientAddress-repository";
import { CreateClientAddressDTO } from "./create-clientAddress-dto";

export type CreateClientAddressRequest = {
  clad_street: string;
  clad_number: string;
  clad_other: string;
  clad_cep: string;
  clad_city: string;
  clad_state: string;
  client_id: number;
}

export class CreateClientAddress {
  private clientAddressRepository: ClientAddressRepository;

  constructor(clientAddressRepository: ClientAddressRepository){
    this.clientAddressRepository = clientAddressRepository;
  }

  async execute({ clad_street, clad_number, clad_other, clad_cep, clad_city, clad_state, client_id}: CreateClientAddressRequest){
    const clientAddress: CreateClientAddressDTO = {
      clad_street,
      clad_number,
      clad_other,
      clad_cep,
      clad_city,
      clad_state,
      client_id
    };
    await this.clientAddressRepository.create(clientAddress);
  }
}