import { ClientAddressRepository } from "../../repositories/clientAddress-repository";
import { DeleteClientAddressDTO } from "./delete-clientAddress-dto";

export class DeleteClientAddress {
  private clientAddressRepository: ClientAddressRepository;

  constructor(clientAddressRepository: ClientAddressRepository) {
    this.clientAddressRepository = clientAddressRepository;
  }

  async execute(clad_id: number): Promise<void> {
    if (!(await this.clientAddressRepository.findById(clad_id))) {
      throw new Error("ClientAddress not found");
    }
    const clientAddress: DeleteClientAddressDTO = {
      clad_id,
    };
    await this.clientAddressRepository.delete(clientAddress.clad_id);
  }
}
