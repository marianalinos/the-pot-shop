import { describe, it, expect, should } from 'vitest';
import { PrismaCartRepository } from '../../repositories/prisma/prisma-cart-repository';
import { DeleteCart } from './delete-user';
import { InMemoryCartRepository } from '../../repositories/in-memory/in-memory-cart-repository';
import { Cart } from '../../entities/cart';

describe('delete a cart', () => {
    it('should be able to delete a cart', () => {
        const deleteCart = new DeleteCart(
            new InMemoryCartRepository([
                new Cart(
                    1,
                    22,
                    new Date(),
                    new Date(),
                )
            ])
        )
        expect(deleteCart.execute(1)).resolves.toBeUndefined();
    })

    it('should not be able to delete a cart that does not exist', () => {
        const deleteCart = new DeleteCart(new InMemoryCartRepository());
        expect(deleteCart.execute(1)).rejects.toThrowError('Cart not found');
    });
});