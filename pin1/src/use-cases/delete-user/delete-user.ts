import { UserRepository } from '../../repositories/user-repository';
import { DeleteUserDTO } from './delete-user-dto';

export interface DeleteUserRequest {
	id: number;
}

export class DeleteUser {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute({ id }: DeleteUserRequest): Promise<void> {
		if (!(await this.userRepository.findById(id))) {
			throw new Error('User not found');
		}
		const user: DeleteUserDTO = {
			id,
		};
		await this.userRepository.delete(user.id);
	}
}
