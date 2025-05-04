import { UpdateItemDTO} from "./update-item-dto"
import { Item } from "../../entities/item"
import { ItemRepository } from "../../repositories/item-repository"


interface UpdateItemRequest {
	id: number;
	id_product: number;
  id_cart: number | null;
}

export class UpdateItem{

  private itemRepository: ItemRepository
 
  constructor(itemRepository: ItemRepository) {
		this.itemRepository = itemRepository;
	}

  async execute ({id , id_cart , id_product} : UpdateItemRequest) : Promise<Item> {
    if (!(await this.itemRepository.findById(id))) {
      throw new Error('Item not found');
    }
    if (id === null) {
      throw new Error("id invallid");
    }
    
    const item: UpdateItemDTO = {
      id,
      id_cart,
      id_product
      };
    return await this.itemRepository.update(item);    
  }

}