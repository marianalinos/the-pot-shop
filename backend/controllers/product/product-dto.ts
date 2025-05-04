import { Decimal } from "@prisma/client/runtime/library";

export interface CreateProductDTO {
	name: string;
	price: Decimal;
	image: string;
}
export interface UpdateProductDTO {
    id: number;
    name: string;
    price: Decimal;
    image: string;
}