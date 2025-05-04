import { ClientRepository } from "../../repositories/client-repository";
import { UpdateClientDTO } from "./update-client.dto";

export interface UpdateClientRequest {
  id: number;
  age: number;
}

export class UpdateClient {

  private clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute({ age, id }: UpdateClientRequest): Promise<void> {
    if (age < 18) {
      throw new Error('Age must be greater than or equal to 18');
    }
    if (age > 120) {
      throw new Error('Age must be less than or equal to 120');
    }
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Client not found');
    }
    const dto : UpdateClientDTO = {
      id,
      age,
    }
    await this.clientRepository.update(dto);
  }

}