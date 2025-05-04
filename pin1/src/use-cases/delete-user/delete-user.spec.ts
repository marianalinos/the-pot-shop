import { describe, it, expect } from 'vitest';
import { User } from '../../entities/user';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { DeleteUser, DeleteUserRequest } from './delete-user';

describe('delete an user', () => {
	it('should be able to delete an user', () => {
		const deleteUser = new DeleteUser(
			new InMemoryUserRepository([
				new User(
					1,
					'joaocleber@gmail.com',
					'123456',
					new Date(),
					new Date(),
				),
			]),
		);

		const deleteUserRequest : DeleteUserRequest = {
			id: 1,
		}

		expect(deleteUser.execute(deleteUserRequest)).resolves.toBeUndefined();
	});

	it('should not be able to delete an user that does not exist', () => {
		const deleteUser = new DeleteUser(new InMemoryUserRepository());

		const deleteUserRequest : DeleteUserRequest = {
			id: 1,
		}

		expect(deleteUser.execute(deleteUserRequest)).rejects.toThrowError('User not found');
	});
});
