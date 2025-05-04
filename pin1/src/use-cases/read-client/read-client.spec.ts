import { describe, it, expect } from 'vitest';
import { Client } from '../../entities/client';
import { InMemoryClientRepository } from '../../repositories/in-memory/in-memory-client-repository';
import { ReadClient } from './read-client';

describe('read a client', () => {
	it('should be able to read a client', () => {
		const readClient = new ReadClient(
			new InMemoryClientRepository([
				new Client(1, 20, 1, new Date(), new Date()),
			]),
		);
		expect(readClient.execute()).resolves.toBeInstanceOf(Array);
	});
});
