import { Order } from "../../models/order";
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from "../../controllers/order/order-dto";
import { OrderRepository } from "../order-repository";
import { OrderStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];
  private carts: any[] = []; // Mock cart data

  constructor(orders: Order[] = [], carts: any[] = []) {
    this.orders = orders;
    this.carts = carts;
  }

  async create(order: CreateOrderDTO): Promise<Order> {
    const cart = this.carts.find((c) => c.id === order.cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const newOrder = new Order(
      this.orders.length + 1,
      new Date(),
      order.status || "PENDING",
      cart.total,
      cart.customerId || null,
      order.cartId
    );
    this.orders.push(newOrder);
    return newOrder;
  }

  async read(id: number | undefined): Promise<Order[]> {
    if (id) {
      return this.orders.filter((order) => order.getId() === id);
    }
    return this.orders;
  }

  async findById(id: number): Promise<Order | null> {
    const order = this.orders.find((order) => order.getId() === id);
    return order || null;
  }

  async update(order: UpdateOrderDTO): Promise<Order> {
    const index = this.orders.findIndex((o) => o.getId() === order.id);
    if (index === -1) {
      throw new Error("Order not found");
    }

    const existingOrder = this.orders[index];
    const updatedOrder = new Order(
      existingOrder.getId(),
      existingOrder.getCreatedAt(),
      order.status,
      existingOrder.getTotal(),
      existingOrder.getCustomerId(),
      existingOrder.getCartId()
    );

    this.orders[index] = updatedOrder;
    return updatedOrder;
  }

  async delete(id: number): Promise<void> {
    const index = this.orders.findIndex((order) => order.getId() === id);
    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }
}
