import { describe, it, expect } from 'vitest';
import { User } from '../../entities/user';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { CreateUser } from './create-user';

describe('create an user', () => {
	it('should be able to create an user', () => {
		const createUser = new CreateUser(new InMemoryUserRepository());

		expect(
			createUser.execute({
				email: 'johndoe@gmail.com',
				secret: '123456',
			}),
		).resolves.toBeUndefined();
	});

	it('should not be able to create an user with an email that already exists', () => {
		const createUser = new CreateUser(
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
	});

	it('should not be able to create an user with an email that already exists', () => {
		const createUser = new CreateUser(
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

		expect(
			createUser.execute({
				email: 'joaocleber@gmail.com',
				secret: '123456',
			}),
		).rejects.toThrowError('User already exists');
	});
});
