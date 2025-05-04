import { Product } from '../../entities/product';
import { CreateProductDTO } from '../../use-cases/create-product/create-product-dto';
import { UpdateProductDTO } from '../../use-cases/update-product/update-product-dto';
import { ProductRepository } from '../product-repository';

export class InMemoryProductRepository implements ProductRepository {
	private products: Product[] = [];

	constructor(products: Product[] = []) {
		this.products = products;
	}

	async readById(id: number): Promise<Product | null> {
    const product = this.products.find(product => product.getId() === id);
    return product ?? null;
  }

	async delete(id: number): Promise<void> {
		const index = this.products.findIndex(
			product => product.getId() === id,
		);
		this.products.splice(index, 1);
	}

	async findById(id: number): Promise<Product | null> {
		const product = this.products.find(product => product.getId() === id);
		return product ?? null;
	}

	async update(product: UpdateProductDTO): Promise<Product> {
		const index = this.products.findIndex(
			productRepo => productRepo.getId() === product.id,
		);
		const newProduct = new Product(
			product.id,
			product.name,
			product.price,
			product.img,
			product.cata_id,
			product.type,
			product.prod_desc,
			new Date(),
			new Date(),
		);
		this.products[index] = newProduct;
		return newProduct;
	}

	async read(type: number | undefined): Promise<Product[]> {
		if (type) {
			const products = this.products.filter(
				product => product.getType() === type,
			);
			return products;
		}
		return this.products;
	}

	async create(product: CreateProductDTO): Promise<void> {
		const newProduct = new Product(
			this.products.length + 1,
			product.name,
			product.price,
			product.img,
			product.cata_id,
			product.type,
			product.prod_desc,
			new Date(),
			new Date(),
		);
		this.products.push(newProduct);
	}

	async findByName(name: string): Promise<Product | null> {
		const product = this.products.find(
			product => product.getName() === name,
		);
		return product ?? null;
	}
}
