import { CartProduct } from "../models/cart-product";
import {
  CreateCartProductDTO,
  UpdateCartProductDTO,
} from "../controllers/cart-product/cart-product-dto";

export interface CartProductRepository {
  create(data: CreateCartProductDTO): Promise<CartProduct>;
  read(type: number | undefined): Promise<CartProduct[]>;
  findById(cart_product_id: number): Promise<CartProduct | null>;
  update(data: UpdateCartProductDTO): Promise<CartProduct>;
  updateQuantity(cart_product_id: number, quantity: number): Promise<CartProduct>;
  delete(cart_product_id: number): Promise<void>;
}
