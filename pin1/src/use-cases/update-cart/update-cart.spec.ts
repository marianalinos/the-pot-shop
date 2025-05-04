import exp from "constants";
import { describe, expect, it } from "vitest";
import { InMemoryCartRepository } from "../../repositories/in-memory/in-memory-cart-repository";
import { Cart } from "../../entities/cart";
import { UpdateCart } from "./update-cart";

describe('updante a cart', () => {
    it('should be able to update a cart', () => {
        const updateCart = new UpdateCart(
            new InMemoryCartRepository([
                new Cart(
                    1,
                    22,
                    new Date(),
                    new Date(),
                )
            ])  
        )
        expect(
            updateCart.execute({
                id: 1,
                clie_id: 22,
            }),
        ).resolves.toBeInstanceOf(Cart);
    });

    it('should not be able to update a cart that does not exist', () => {
        const updateCart = new UpdateCart(new InMemoryCartRepository());
        expect(
            updateCart.execute({
                id: 1,
                clie_id: 22,
            }),
        ).rejects.toThrowError('Cart not found');
    });
});





        