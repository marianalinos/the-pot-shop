import { ClientRepository } from '../../repositories/client-repository';
import { CreateClientDTO } from './create-client-dto';


export interface CreateClientRequest {
	age: number;
	user_id: number;
}

export class CreateClient{
	private clientRepository: ClientRepository;

	constructor(clientRepository: ClientRepository) {
		this.clientRepository = clientRepository;
	}

	async execute({ age, user_id }: CreateClientRequest): Promise<void> {
		if (age < 18) {
      throw new Error('Age must be greater than or equal to 18');
    }
    if (age > 120) {
      throw new Error('Age must be less than or equal to 120');
    }
    if (await this.clientRepository.findByUserId(user_id)) {
      throw new Error('A client with this user_id already exists');
    }
		const user: CreateClientDTO = {
			age,
			user_id,
		};
		await this.clientRepository.create(user);
	}
}