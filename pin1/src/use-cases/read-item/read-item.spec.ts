import {describe , it , expect} from "vitest";
import { InMemoryItemRepository } from "../../repositories/in-memory/in-memory-item-repository";

describe("read item", () => {
  it("should read all items", async () => {
    const inMemoryItemRepository = new InMemoryItemRepository();
    const items = await inMemoryItemRepository.read();
    expect(items).toEqual([]);
  });

  it("should read items by cart id", async () => {
    const inMemoryItemRepository = new InMemoryItemRepository();
    const items = await inMemoryItemRepository.readByCartId(1);
    expect(items).toEqual([]);
  });
});
