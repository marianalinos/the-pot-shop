import { describe, it, expect } from 'vitest';
import { Client } from '../../entities/client';
import { InMemoryClientRepository } from '../../repositories/in-memory/in-memory-client-repository';
import { CreateClient } from './create-client';

describe('create a client', () => {
	it('should be able to create a client', () => {
		const createClient = new CreateClient(new InMemoryClientRepository());
		expect(
			createClient.execute({
				age: 20,
				user_id: 1,
			}),
		).resolves.toBeUndefined();
	});

	it('should not be able to create a client with age less than 18', () => {
		const createClient = new CreateClient(new InMemoryClientRepository());
		expect(
			createClient.execute({
				age: 17,
				user_id: 1,
			}),
		).rejects.toEqual(new Error('Age must be greater than or equal to 18'));
	});

	it('should not be able to create a client with age greater than 120', () => {
		const createClient = new CreateClient(new InMemoryClientRepository());
		expect(
			createClient.execute({
				age: 121,
				user_id: 1,
			}),
		).rejects.toEqual(new Error('Age must be less than or equal to 120'));
	});

	it('should not be able to create a client with an existing user_id', () => {
		const createClient = new CreateClient(
			new InMemoryClientRepository([
				new Client(1, 20, 1, new Date(), new Date()),
			]),
		);

		expect(
			createClient.execute({
				age: 20,
				user_id: 1,
			}),
		).rejects.toEqual(
			new Error('A client with this user_id already exists'),
		);
	});
});
