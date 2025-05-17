import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../order-repository";
import { Order } from "../../models/order";
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from "../../controllers/order/order-dto";
import { Decimal } from "@prisma/client/runtime/library";

export class PrismaOrderRepository implements OrderRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(order: CreateOrderDTO): Promise<Order> {
    // Get the cart to get its total
    const cart = await this.prisma.cart.findUnique({
      where: { id: order.cartId },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const createdOrder = await this.prisma.order.create({
      data: {
        status: order.status || "PENDING",
        total: cart.total, // Use the cart's total
        customerId: cart.customerId,
        cartId: order.cartId,
      },
    });

    return new Order(
      createdOrder.id,
      createdOrder.createdAt,
      createdOrder.status,
      createdOrder.total,
      createdOrder.customerId,
      createdOrder.cartId
    );
  }
  
  async read(id: number | undefined): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        id: id,
      },
    });

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.createdAt,
          order.status,
          order.total,
          order.customerId,
          order.cartId
        )
    );
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: id,
      },
    });

    if (!order) {
      return null;
    }

    return new Order(
      order.id,
      order.createdAt,
      order.status,
      order.total,
      order.customerId,
      order.cartId
    );
  }

  async update(order: UpdateOrderDTO): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: order.status,
      },
    });

    return new Order(
      updatedOrder.id,
      updatedOrder.createdAt,
      updatedOrder.status,
      updatedOrder.total,
      updatedOrder.customerId,
      updatedOrder.cartId
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id: id,
      },
    });
  }
}
