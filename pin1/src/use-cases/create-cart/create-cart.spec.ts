import { describe, it, expect } from 'vitest';
import { InMemoryCartRepository } from '../../repositories/in-memory/in-memory-cart-repository';
import { CreateCart } from './create-cart';

describe('create a cart', () => {
    it('should be able to create a cart', () => {
        const createCart = new CreateCart (new InMemoryCartRepository());

        expect(
            createCart.execute({
                id_clie: 22
            }),
        ).resolves.toBeUndefined();
    });

})