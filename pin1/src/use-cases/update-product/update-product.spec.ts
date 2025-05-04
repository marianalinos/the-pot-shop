import {it,describe,expect} from "vitest"
import { UpdateProduct } from "./update-product"
import { InMemoryProductRepository } from "../../repositories/in-memory/in-memory-product-repository";
import { Product } from "../../entities/product";

describe("UpdateProductRepository", () => {
  it("should be able to update a product", async () => {
    const productRepository = new InMemoryProductRepository();
    const updateProduct = new UpdateProduct(productRepository);
    await productRepository.create({
      name: "product 1",
      price: 100,
      img: "img",
      cata_id: 1,
      prod_desc: "desc",
      type: 1,
    });
    const product = await productRepository.findByName("product 1");
    const updatedProduct = await updateProduct.update({
      id: product?.getId() ?? 0,
      name: "product 1 updated",
      price: 100,
      img: "img",
      cata_id: 1,
      prod_desc: "desc",
      type: 1,
    });

  it("should not be able to update a product that does not exist", () => {
    const productRepository = new InMemoryProductRepository();
    const updateProduct = new UpdateProduct(productRepository);
    expect(
      updateProduct.update({
        id: 1,
        name: "product 1 updated",
        price: 100,
        img: "img",
        cata_id: 1,
        prod_desc: "desc",
        type: 1,
      })
    ).rejects.toThrowError("Product not found");
  });
})
})
