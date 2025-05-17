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
      const { cartId } = req.body;
      
      const cart = await this.prisma.cart.findUnique({
        where: { id: Number(cartId) },
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

      const createOrderRequest: CreateOrderDTO = {
        status: req.body.status,
        cartId: Number(cartId),
      };

      const order = await this.repository.create(createOrderRequest);
      return res.status(201).json(order);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as string;
      const orders = await this.repository.read(
        isNaN(Number(id)) || Number(id) == 0 ? undefined : Number(id)
      );
      return res.status(200).json(orders);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const order = await this.repository.findById(Number(id));
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
      const updateOrderRequest: UpdateOrderDTO = {
        id: Number(req.params.id),
        status: req.body.status,
      };

      const order = await this.repository.update(updateOrderRequest);
      return res.status(200).json(order);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleteOrderRequest = {
        id: Number(req.params.id),
      };
      await this.repository.delete(deleteOrderRequest.id);
      return res.status(200).json(deleteOrderRequest);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}