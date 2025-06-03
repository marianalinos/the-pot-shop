import { OrderRepository } from "../../repositories/order-repository";
import { Request, Response } from "express";
import { CreateOrderDTO, UpdateOrderDTO } from "./order-dto";
import { PrismaClient } from "@prisma/client";

export class OrderController {
  private repository: OrderRepository;
  private prisma: PrismaClient;

  constructor(repository: OrderRepository) {
    this.repository = repository;
    this.prisma = new PrismaClient();
  }

  async create(req: Request, res: Response) {
    try {
      const { cart_id } = req.body;
      
      const cart = await this.prisma.cart.findUnique({
        where: { cart_id: Number(cart_id) },
        include: {
          products: {
            include: {
              product: true,
            },
          },
          coupon: true,
        },
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const createOrder: CreateOrderDTO = {
        status: req.body.status,
        cart_id: Number(cart_id),
      };

      const order = await this.repository.create(createOrder);
      return res.status(201).json(order);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const customer_id = req.query.customer_id as string;
      const orders = await this.repository.read(
        isNaN(Number(customer_id)) || Number(customer_id) == 0 ? undefined : Number(customer_id)
      );
      return res.status(200).json(orders);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { order_id } = req.params;
      const order = await this.repository.findById(Number(order_id));
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateOrder: UpdateOrderDTO = {
        order_id: Number(req.params.order_id),
        status: req.body.status,
      };

      const order = await this.repository.update(updateOrder);
      return res.status(200).json(order);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleteOrder = {
        order_id: Number(req.params.order_id),
      };
      await this.repository.delete(deleteOrder.order_id);
      return res.status(200).json(deleteOrder);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { order_id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const updatedOrder = await this.repository.updateStatus(Number(order_id), status);
      return res.status(200).json(updatedOrder);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}