import { CartProduct } from "../models/cart-product";
import {
  CreateCartProductDTO,
  UpdateCartProductDTO,
} from "../controllers/cart-product/cart-product-dto";

export interface CartProductRepository {
  create(data: CreateCartProductDTO): Promise<CartProduct>;
  read(type: number | undefined): Promise<CartProduct[]>;
  findById(id: number): Promise<CartProduct | null>;
  update(data: UpdateCartProductDTO): Promise<CartProduct>;
  delete(id: number): Promise<void>;
}
