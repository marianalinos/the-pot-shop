import { Cart } from "../models/cart";
import { CreateCartDTO, UpdateCartDTO } from "../controllers/cart/cart-dto";
import { Decimal } from "@prisma/client/runtime/library";

export interface CartRepository {
  create(cart: CreateCartDTO): Promise<Cart>;
  read(type: number | undefined): Promise<Cart[]>;
  findById(id: number): Promise<Cart | null>;
  update(cart: UpdateCartDTO): Promise<Cart>;
  delete(id: number): Promise<void>;
  calculateTotal(id: number): Promise<Decimal>;
}
