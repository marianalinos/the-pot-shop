import { describe, expect, it } from 'vitest';
import { UpdateUser, UpdateUserRequest } from './update-user';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { User } from '../../entities/user';

describe('update an user', () => {
	it('should be able to update an user', async () => {
		const updateUser = new UpdateUser(
			new InMemoryUserRepository([
				new User(
					1,
					'flavindopneu@gmail.com',
					'123456',
					new Date(),
					new Date(),
				),
			]),
		);

		const updateUserRequest: UpdateUserRequest = {
			id: 1,
			email: 'joaozinho2@gaming.com',
			secret: '123456',
		};

		expect(updateUser.execute(updateUserRequest)).resolves.toBeInstanceOf(
			User,
		);
	});

	it('should not be able to update an user that does not exist', () => {
		const updateUser = new UpdateUser(new InMemoryUserRepository());

		const updateUserRequest: UpdateUserRequest = {
			id: 1,
			email: 'joaocleber@gmail.com',
			secret: '123456',
		};

		expect(updateUser.execute(updateUserRequest)).rejects.toThrowError('User not found');
	});

	it('should not be able to update an user with an email that is already in use', () => {
		const updateUser = new UpdateUser(
			new InMemoryUserRepository([
				new User(
					1,
					'jaofo@gmail.com',
					'123456',
					new Date(),
					new Date(),
				),
				new User(
					2,
					'flavindopneu@gmail.com',
					'123456',
					new Date(),
					new Date(),
				)
			]));

		const updateUserRequest: UpdateUserRequest = {
			id: 1,
			email: 'flavindopneu@gmail.com',
			secret: '123456',
		};

		expect(updateUser.execute(updateUserRequest)).rejects.toThrowError('Email already in use');
	});

});
