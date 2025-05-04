import { describe, it, expect } from "vitest";
import { Catalogue } from "../../entities/catalogue";
import {  InMemoryCatalogueRepository } from "../../repositories/in-memory/in-memory-catalogue-repository";
import { CreateCatalogue } from "./create-catalogue";

describe('create an user', () => {
	it('should be able to create an user', () => {
		const createCatalogue = new CreateCatalogue(new InMemoryCatalogueRepository());

		expect(
			createCatalogue.execute({
				title: 'CreateCatalogue',
			}),
		).resolves.toBeUndefined();
	});

	it('should not be able to create an user with an email that already exists', () => {
		const createCatalogue = new CreateCatalogue(
			new InMemoryCatalogueRepository([
				new Catalogue(
					1,
          'CreateCatalogue',
				),
			]),
		);
	});
});
