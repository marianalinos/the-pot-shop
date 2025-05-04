import { ClientRepository } from "../../repositories/client-repository";

export class DeleteClient{

  private clientRepository: ClientRepository;
  
  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: number): Promise<void> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Client not found');
    }
    await this.clientRepository.delete(id);
  }

}