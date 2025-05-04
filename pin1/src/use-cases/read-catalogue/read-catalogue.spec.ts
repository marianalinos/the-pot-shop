import { describe, it, expect } from 'vitest';
import { InMemoryCatalogueRepository } from '../../repositories/in-memory/in-memory-catalogue-repository';
import { ReadCatalogue } from './read-catalogue';

describe('read users', () => {
	it('should be able to read users', () => {
		const readCatalogue = new ReadCatalogue(new InMemoryCatalogueRepository());

		expect(readCatalogue.execute()).resolves.toBeInstanceOf(Array);
	});
});
