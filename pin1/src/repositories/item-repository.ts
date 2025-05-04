import { Item } from "../entities/item";
import { CreateItemDTO } from "../use-cases/create-item/create-item-dto";
import { UpdateItemDTO } from "../use-cases/update-item/update-item-dto";



export interface ItemRepository{
    create(item: CreateItemDTO): Promise<void>;
    read(): Promise<Item[]>;
    readByCartId(cart_id: number): Promise<Item[]>;
    delete(id: number): Promise<void>;
    update(item: UpdateItemDTO): Promise<Item>;
    findById (id: number): Promise< Item | null>;

}