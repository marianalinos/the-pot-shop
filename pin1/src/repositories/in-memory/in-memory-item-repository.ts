import { Item } from "../../entities/item";
import { CreateItemDTO } from "../../use-cases/create-item/create-item-dto";
import { UpdateItemDTO } from "../../use-cases/update-item/update-item-dto";
import { ItemRepository } from "../item-repository";

export class InMemoryItemRepository implements ItemRepository {
    private items: Item[] = [];

    constructor(items: Item[] = []) {
      this.items = items;
    }

    async create(item: CreateItemDTO): Promise<void>{
      const newItem = new Item(
        this.items.length +1 ,
        item.prod_id,
        item.cart_id,
        new Date(),
        new Date()
        );

      this.items.push(newItem);
    }

    async read(): Promise<Item[]> {
      return this.items;
    }

    async readByCartId(cart_id: number): Promise<Item[]> {
      const items = this.items.filter((item) => item.getCartId() === cart_id);
      return items;
    }

    async delete(id: number): Promise<void> {
      const index = this.items.findIndex((item) => item.getId() === id);
      this.items.splice(index, 1);
    }

    async update(item: UpdateItemDTO): Promise<Item> {
      const index = this.items.findIndex(
        itemRep => itemRep.getId() === item.id,
      );    
      const idCart = item.id_cart !== null ? item.id_cart : 0;
      const newItem = new Item(
        item.id, 
        idCart,
        item.id_product,
        new Date(),
        new Date()
      );
      this.items[index] = newItem;
      return newItem;  
    }
    
    async findById(id: number): Promise<Item | null> {
      const item = this.items.find((item) => item.getId() === id);
      return item ?? null;
    }
}