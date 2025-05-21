import { Order } from "../../models/order";
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from "../../controllers/order/order-dto";
import { OrderRepository } from "../order-repository";

export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];
  private carts: any[] = []; // Mock cart data

  constructor(orders: Order[] = [], carts: any[] = []) {
    this.orders = orders;
    this.carts = carts;
  }

  async create(order: CreateOrderDTO): Promise<Order> {
    const cart = this.carts.find((c) => c.id === order.cart_id);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const newOrder = new Order(
      this.orders.length + 1,
      new Date(),
      order.status || "PENDENTE",
      cart.total,
      cart.customer_id || null,
      order.cart_id
    );
    this.orders.push(newOrder);
    return newOrder;
  }

  async read(type: number | undefined): Promise<Order[]> {
    if (type) {
      return this.orders.filter((order) => order.getId() === type);
    }
    return this.orders;
  }

  async findById(order_id: number): Promise<Order | null> {
    const order = this.orders.find((order) => order.getId() === order_id);
    return order || null;
  }

  async update(data: UpdateOrderDTO): Promise<Order> {
    const index = this.orders.findIndex((o) => o.getId() === data.order_id);
    if (index === -1) {
      throw new Error("Order not found");
    }

    const existingOrder = this.orders[index];
    const updatedOrder = new Order(
      existingOrder.getId(),
      existingOrder.getCreatedAt(),
      data.status,
      existingOrder.getTotal(),
      existingOrder.getCustomerId(),
      existingOrder.getCartId()
    );

    this.orders[index] = updatedOrder;
    return updatedOrder;
  }

  async delete(order_id: number): Promise<void> {
    const index = this.orders.findIndex((order) => order.getId() === order_id);
    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }
}
