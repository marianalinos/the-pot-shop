import { CreateProduct } from './create-product'
import { describe, it, expect } from 'vitest';
import { Product } from '../../entities/product';
import { InMemoryProductRepository } from '../../repositories/in-memory/in-memory-product-repository';

describe('Create Product', () => {
    it ('should be able to create an product', () =>{
        const createProduct = new CreateProduct(
            new InMemoryProductRepository(),
        );
        expect(
            createProduct.execute({
                name: 'Teste',
                price: 1,
                img: 'Teste',
                cata_id: 1,
                prod_desc: 'Teste',
                type: 1,
            }),
        ).resolves.toBeUndefined();
    });

    it ('should not be able to create an product with an name that already exists', () =>{
        const createProduct = new CreateProduct(
            new InMemoryProductRepository([
                new Product(1, 'Teste', 1, 'Teste', 1, 1, 'Teste', new Date(), new Date()),
            ]),
        );

        expect(
            createProduct.execute({
                name: 'Teste',
                price: 1,
                img: 'Teste',
                cata_id: 1,
                prod_desc: 'Teste',
                type: 1,
            }),
        ).rejects.toThrowError('Product already exists');
    }
    );
});