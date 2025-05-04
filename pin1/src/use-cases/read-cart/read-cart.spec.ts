import { describe, it, expect } from 'vitest';
import { InMemoryCartRepository } from '../../repositories/in-memory/in-memory-cart-repository';
import { ReadCart } from './read-cart';
import { Cart } from '../../entities/cart';

describe('read carts', () => {
    it('should be able to read carts', () => {
        const readCart = new ReadCart(new InMemoryCartRepository());
        expect(readCart.execute()).resolves.toBeInstanceOf(Array);
    })

    it('should be able to read a cart by id', () => {
        const readCart = new ReadCart(new InMemoryCartRepository([
            new Cart(1, 1, new Date(), new Date()),
            new Cart(2, 2, new Date(), new Date()),
            new Cart(3, 3, new Date(), new Date()),
        ]));
        expect(readCart.readById(2)).resolves.toBeInstanceOf(Object);
    })

    

})