import { CartRepository } from "../../repositories/cart-repository";
import { DeleteCartDTO } from "./delete-cart-dto";

export class DeleteCart {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async execute(id: number): Promise<void> {
        if (!(await this.cartRepository.findById(id))) {
            throw new Error('Cart not found');
        }
        const cart: DeleteCartDTO = {
            id,
        };
        await this.cartRepository.delete(cart.id);
    }
    
}