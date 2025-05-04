import { PrismaClient } from '@prisma/client';
import { ItemRepository} from '../item-repository';
import { CreateItemDTO } from '../../use-cases/create-item/create-item-dto';
import { UpdateItemDTO } from '../../use-cases/update-item/update-item-dto';
import { Item } from '../../entities/item';
  
export class PrismaItemRepository implements ItemRepository{
  private prisma: PrismaClient;
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(item: CreateItemDTO): Promise<void> {
    await this.prisma.item.create({
      data: {
        prod_id: item.prod_id,
        cart_id: item.cart_id
      }
    })

  }
  async read(): Promise<Item[]> {
    const items = await this.prisma.item.findMany();
    return items.map(item => new Item(item.item_id, item.prod_id, item.cart_id, item.created_at, item.updated_at));
  }

  async readByCartId(cart_id: number): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: {
        cart_id: cart_id
      }
    });
    return items.map(item => new Item(item.item_id, item.prod_id, item.cart_id, item.created_at, item.updated_at));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.item.delete({
      where: {
        item_id: id
      }
    })
  }

  async findById(id: number): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({
      where: {
        item_id: id
      }
    })
    if (!item) {
      return null;
    }
    return new Item(
      item.item_id, 
      item.prod_id, 
      item.cart_id, 
      item.created_at, 
      item.updated_at);
  }





  async update(item: UpdateItemDTO): Promise<Item> {
    const updateItem = await this.prisma.item.update({
      where: {
          item_id: item.id,
      },
      data: {
          cart_id: item.id_cart,
          prod_id: item.id_product
      },
  });

  return new Item(
    updateItem.item_id, 
    updateItem.prod_id,
    updateItem.cart_id,
    updateItem.created_at,
    updateItem.updated_at
  );
    
  }

}