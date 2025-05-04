import { describe, it, expect } from 'vitest';
import {  Catalogue } from '../../entities/catalogue';
import { InMemoryCatalogueRepository } from '../../repositories/in-memory/in-memory-catalogue-repository';
import { DeleteCatalogue } from './delete-catalogue';

describe('delete an Catalogue', () => {
	it('should be able to delete an Catalogue', () => {
		const deleteCatalogue = new DeleteCatalogue(
			new InMemoryCatalogueRepository([
				new Catalogue(
				1,
        'teste',
				),
			]),
		);

		expect(deleteCatalogue.execute(1)).resolves.toBeUndefined();
	});

	it('should not be able to delete an Catalogue that does not exist', () => {
		const deleteCatalogue = new DeleteCatalogue(new InMemoryCatalogueRepository());

		expect(deleteCatalogue.execute(1)).rejects.toThrowError('Catalogue not found');
	});
});
