import { CreateItemDTO } from "./create-item-dto";
import { ItemRepository } from "../../repositories/item-repository";

interface CreateItemRequest {
  cart_id: number | null;
  prod_id: number ;
}

export class CreateItem {
  private itemRepository: ItemRepository;

  constructor(itemRepository: ItemRepository) {
    this.itemRepository = itemRepository;
  }

  async execute({ prod_id, cart_id }: CreateItemRequest): Promise<void> {
    
    if (prod_id < 1) {
      throw new Error("Prod_id invallid");
    }
    if (!cart_id || cart_id < 1) {
      throw new Error("cart_id invallid");
    }

    const item: CreateItemDTO = {
      prod_id,
      cart_id
    };
    await this.itemRepository.create(item);
  }
}
