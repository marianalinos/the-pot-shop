import { describe , expect , it} from "vitest"
import { ReadProduct } from "./read-product"
import { InMemoryProductRepository } from "../../repositories/in-memory/in-memory-product-repository";

describe('read products', () => {
 

  it('should read all products', async () => {
    const productRepository = new InMemoryProductRepository();
    const readProduct = new ReadProduct(productRepository);
    await productRepository.create({
      name: 'product 1',
      price: 100,
      img: 'img',
      cata_id: 1,
      prod_desc: 'desc',
      type: 1,
    });
    await productRepository.create({
      name: 'product 2',
      price: 100,
      img: 'img',
      cata_id: 1,
      prod_desc: 'desc',
      type: 1,
    });
    const products = await readProduct.read(undefined);
    expect(products.length).toBe(2);
  });
}
)