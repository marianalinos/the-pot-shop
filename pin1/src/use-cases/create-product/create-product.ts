import { ProductRepository } from '../../repositories/product-repository';
import { CreateProductDTO } from './create-product-dto';

export type CreateProductRequest = {
	name: string;
	price: number;
	img: string;
	cata_id: number;
	prod_desc: string;
	type: number;
};

export class CreateProduct {
	private productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

	async execute({
		name,
		price,
		img,
		cata_id,
		prod_desc,
		type,
	}: CreateProductRequest) {
		if (await this.productRepository.findByName(name)) {
			throw new Error('Product already exists');
		}

		const product: CreateProductDTO = {
			name,
			price,
			img,
			cata_id,
			prod_desc,
			type,
		};
		await this.productRepository.create(product);
	}
}
