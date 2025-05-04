import { describe , expect, it} from "vitest";
import { UpdateItem } from "./update-item";
import { Item } from "../../entities/item";
import { InMemoryItemRepository } from "../../repositories/in-memory/in-memory-item-repository";


describe('update an catalogue', () => {
	it('should be able to update an catalogue', async () => {
		const updateCatalogue = new UpdateItem(
			new InMemoryItemRepository(
        [ new Item(
          1,
          1,
          1
        ),]
      ),
			
		);

		expect(
			updateCatalogue.execute({
				id: 1,
				id_cart: 2,
        id_product: 1,
			}),
		).resolves.toBeInstanceOf(Item);
	});

	it('should not be able to update an Item that does not exist', () => {
		const updateCatalogue = new UpdateItem(new InMemoryItemRepository());

		expect(
			updateCatalogue.execute({
				id: 1,
        id_cart: 1,
        id_product: 1,
			}),
		).rejects.toThrowError('Item not found');
	});
});
