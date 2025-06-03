import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../order-repository";
import { Order } from "../../models/order";
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from "../../controllers/order/order-dto";
import { CartProduct } from "../../models/cart-product";
import { Product } from "../../models/product";

export class PrismaOrderRepository implements OrderRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateOrderDTO): Promise<Order> {
    // Get the cart to get its total
    const cart = await this.prisma.cart.findUnique({
      where: { cart_id: data.cart_id },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const createdOrder = await this.prisma.order.create({
      data: {
        status: data.status || "CONCLUÍDO",
        total: cart.total, // Use the cart's total
        customer_id: cart.customer_id,
        cart_id: data.cart_id,
      },
    });

    return new Order(
      createdOrder.order_id,
      createdOrder.created_at,
      createdOrder.status,
      createdOrder.total,
      createdOrder.customer_id,
      createdOrder.cart_id
    );
  }

  async read(type: number | undefined): Promise<Order[]> {
  const orders = await this.prisma.order.findMany({
    where: {
      customer_id: type,
    },
    include: {
      cart: {
        include: {
          products: {
            include: {
              product: true,
            },
          },
          coupon: true
        },
      },
    },
  });
  // @ts-ignore
  return orders;
}


  async findById(order_id: number): Promise<Order | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        order_id: order_id,
      },
    });

    if (!order) {
      return null;
    }

    return new Order(
      order.order_id,
      order.created_at,
      order.status,
      order.total,
      order.customer_id,
      order.cart_id
    );
  }

  async update(data: UpdateOrderDTO): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: {
        order_id: data.order_id,
      },
      data: {
        status: data.status,
      },
    });

    return new Order(
      updatedOrder.order_id,
      updatedOrder.created_at,
      updatedOrder.status,
      updatedOrder.total,
      updatedOrder.customer_id,
      updatedOrder.cart_id
    );
  }

  async delete(order_id: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
        order_id: order_id,
      },
    });
  }
}
