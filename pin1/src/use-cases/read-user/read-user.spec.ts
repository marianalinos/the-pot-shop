import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { ReadUser } from './read-user';

describe('read users', () => {
	it('should be able to read users', () => {
		const readUser = new ReadUser(new InMemoryUserRepository());

		expect(readUser.execute()).resolves.toBeInstanceOf(Array);
	});
});
