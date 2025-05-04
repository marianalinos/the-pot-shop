import { Cart } from '../../entities/cart';
import { CreateCartDTO } from "../../use-cases/create-cart/create-cart-dto";
import { UpdateCartDTO } from '../../use-cases/update-cart/update-cart-dto';
import { CartRepository } from "../cart-repository";

export class InMemoryCartRepository implements CartRepository {
    private carts: Cart[] = [];

    constructor(carts: Cart[] = []){
        this.carts = carts;
    }

    async create(cart: CreateCartDTO): Promise<void>{
        const newCart = new Cart(
            this.carts.length + 1,
            cart.clie_id,
            new Date(),
            new Date(),
        )
        this.carts.push(newCart);
    }

    async findById(id: number): Promise<Cart | null> {
        const cart = this.carts.find(cart => cart.getId() === id);
        return cart ?? null;
    }

    async read(): Promise<Cart[]> {
        return this.carts;
    }

    async readById(id: number): Promise<Cart | null> {
        const cart = this.carts.find(cart => cart.getId() === id);
        return cart ?? null;
    }

    async findByClientId(clie_id: number): Promise<Cart | null> {
        const cart = this.carts.find(cart => cart.getClieId() === clie_id);
        return cart ?? null;    
    }

   
    async update(cart: UpdateCartDTO): Promise<Cart> {
        const index = this.carts.findIndex(
            cartRepo => cartRepo.getId() === cart.id,
        );
        const newCart = new Cart(
            cart.id, 
            cart.clie_id,
            new Date(),
            this.carts[index].getCreatedAt(),
        );
        this.carts[index] = newCart;
        return newCart;
    }

    async delete(id: number): Promise<void> {
        const index = this.carts.findIndex(cart => cart.getId() === id);
        this.carts.splice(index, 1);
    }
}