import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';

export class ReadUser {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute(): Promise<User[]> {
		return await this.userRepository.read();
	}

	async findById(id: number): Promise<User | null> {
		return await this.userRepository.findById(id);
	}
}
