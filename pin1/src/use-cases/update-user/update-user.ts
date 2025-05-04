import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user-repository';
import { UpdateUserDTO } from './update-user-dto';

export interface UpdateUserRequest {
	id: number;
	email: string;
	secret: string;
}

export class UpdateUser {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute({ id, email, secret }: UpdateUserRequest): Promise<User> {
		if (!(await this.userRepository.findById(id))) {
			throw new Error('User not found');
		}
		const userWithSameEmail = await this.userRepository.findByEmail(email);
		if (userWithSameEmail && userWithSameEmail.getId() !== id) {
			throw new Error('Email already in use');
		}
		const user: UpdateUserDTO = {
			id,
			email,
			secret,
		};
		return await this.userRepository.update(user);
	}
}
