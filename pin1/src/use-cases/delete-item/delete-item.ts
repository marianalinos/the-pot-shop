import { ItemRepository } from "../../repositories/item-repository";
import { DeleteItemDTO } from "./delete-item-dto";


export class DeleteItem {
  private itemRepository: ItemRepository;

  constructor(itemRepository: ItemRepository) {
    this.itemRepository = itemRepository;
  }

  async execute(id: number): Promise<void> {
    if (!(await this.itemRepository.findById(id))) {
      throw new Error('Item not found');
  }

    if (id === null) {
      throw new Error("id invallid");
    }

    
  const item: DeleteItemDTO = {
    id,
  };
  await this.itemRepository.delete(item.id);
  }
}
