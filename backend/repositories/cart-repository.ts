import { Cart } from "../models/cart";
import { CreateCartDTO, UpdateCartDTO } from "../controllers/cart/cart-dto";
import { Decimal } from "@prisma/client/runtime/library";

export interface CartRepository {
  create(data: CreateCartDTO): Promise<Cart>;
  read(type: number | undefined): Promise<Cart[]>;
  findById(cart_id: number): Promise<Cart | null>;
  update(data: UpdateCartDTO): Promise<Cart>;
  delete(cart_id: number): Promise<void>;
  calculateTotal(cart_id: number): Promise<Decimal>;
}
