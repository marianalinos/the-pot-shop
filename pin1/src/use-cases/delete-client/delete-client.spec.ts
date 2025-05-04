import { describe, it, expect } from 'vitest';
import { Client } from '../../entities/client';
import { InMemoryClientRepository } from '../../repositories/in-memory/in-memory-client-repository';
import { DeleteClient } from './delete-client';

describe('delete a client', () => {
	it('should be able to delete a client', () => {
		const deleteClient = new DeleteClient(
			new InMemoryClientRepository([
				new Client(1, 20, 1, new Date(), new Date()),
			]),
		);
		expect(deleteClient.execute(1)).resolves.toBeUndefined();
	});

	it('should not be able to delete a client that does not exist', () => {
		const deleteClient = new DeleteClient(new InMemoryClientRepository());
		expect(deleteClient.execute(1)).rejects.toEqual(
			new Error('Client not found'),
		);
	});
});
