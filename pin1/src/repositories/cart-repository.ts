import { Cart } from '../entities/cart';
import { CreateCartDTO } from '../use-cases/create-cart/create-cart-dto';
import { UpdateCartDTO } from '../use-cases/update-cart/update-cart-dto';

export interface CartRepository {
    create(cart: CreateCartDTO): Promise<void>;
    findById(id: number): Promise<Cart | null>;
    findByClientId(id_clie: number): Promise<Cart | null>;
    read(): Promise<Cart[]>;
    readById(id: number): Promise<Cart | null>;
    update(cart: UpdateCartDTO): Promise<Cart>;
    delete(id: number): Promise<void>;
}