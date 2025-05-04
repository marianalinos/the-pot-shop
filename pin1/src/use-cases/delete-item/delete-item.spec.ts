import {describe, it , expect} from "vitest"
import { InMemoryItemRepository } from "../../repositories/in-memory/in-memory-item-repository"
import { DeleteItem } from "./delete-item"
import { Item } from "../../entities/item";

describe('delete an Item', () => {
	it('should be able to delete an Item', () => {
		const deleteItem = new DeleteItem(
			new InMemoryItemRepository([
				new Item(
				1,
        1,
        1
				),
			]),
		);

		expect(deleteItem.execute(1)).resolves.toBeUndefined();
	});
});
