import { Cart } from "../../entities/cart";
import { CartRepository } from "../../repositories/cart-repository";
import { UpdateCartDTO } from "./update-cart-dto";

interface UpdateCartRequest {
    id: number;
    clie_id: number;
}

export class UpdateCart {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async execute({ id, clie_id }: UpdateCartRequest): Promise<Cart> {
        if (!(await this.cartRepository.findById(id))) {
            throw new Error('Cart not found');
        }
        const cart: UpdateCartDTO = {
            id,
            clie_id
        };
        return await this.cartRepository.update(cart);
    } 
}