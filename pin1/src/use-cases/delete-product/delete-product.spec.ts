import {describe,expect,it} from 'vitest'
import { DeleteProduct } from './delete-product'
import { InMemoryProductRepository } from '../../repositories/in-memory/in-memory-product-repository'

describe('DeleteProduct', () => {
  it('should be able to delete a product', async () => {
    const productRepository = new InMemoryProductRepository()
    const deleteProduct = new DeleteProduct(productRepository)
    await productRepository.create({
      name: 'product 1',
      price: 100,
      img: 'img',
      cata_id: 1,
      prod_desc: 'desc',
      type: 1
    })
    const product = await productRepository.findByName('product 1')
    await deleteProduct.execute(product?.getId() ?? 0)
    const products = await productRepository.read()
    expect(products.length).toBe(0)
  })
  it('should not be able to delete a product that does not exist', () => {
    const productRepository = new InMemoryProductRepository()
    const deleteProduct = new DeleteProduct(productRepository)
    expect(deleteProduct.execute(1)).rejects.toThrowError('Product not found')
  })
}
)

