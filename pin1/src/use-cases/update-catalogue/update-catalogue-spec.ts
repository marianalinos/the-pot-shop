import { describe, expect, it } from 'vitest';
import { UpdateCatalogue } from './update-catalogue';
import { InMemoryCatalogueRepository } from '../../repositories/in-memory/in-memory-catalogue-repository';
import { Catalogue } from '../../entities/catalogue';

describe('update an catalogue', () => {
	it('should be able to update an catalogue', async () => {
		const updateCatalogue = new UpdateCatalogue(
			new InMemoryCatalogueRepository(
        [ new Catalogue(
          1,
          'title',
        ),]
      ),
			
		);

		expect(
			updateCatalogue.execute({
				id: 1,
				title: 'title update',
			}),
		).resolves.toBeInstanceOf(Catalogue);
	});

	it('should not be able to update an catalogue that does not exist', () => {
		const updateCatalogue = new UpdateCatalogue(new InMemoryCatalogueRepository());

		expect(
			updateCatalogue.execute({
				id: 1,
        title: 'title',

			}),
		).rejects.toThrowError('Catalogue not found');
	});
});
