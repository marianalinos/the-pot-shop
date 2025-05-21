import { Decimal } from "@prisma/client/runtime/library";

export interface CreateProductDTO {
	product_name: string;
	price: Decimal;
	image: string;
}
export interface UpdateProductDTO {
    product_id: number;
    product_name: string;
    price: Decimal;
    image: string;
}