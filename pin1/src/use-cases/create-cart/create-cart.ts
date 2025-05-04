import { CartRepository } from "../../repositories/cart-repository";
import { CreateCartDTO } from "./create-cart-dto";

export type CreateCartRequest = {
    clie_id: number;
}

export class CreateCart {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository){
        this.cartRepository = cartRepository;
    }

    async execute ({clie_id}: CreateCartRequest){
        const cart: CreateCartDTO = {
            clie_id
        };
        await this.cartRepository.create(cart);
    }
}