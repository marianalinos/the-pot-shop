import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { CreateOrder, CreateOrderRequest } from "./create-order";
import { PrismaOrderRepository } from "../../repositories/prisma/prisma-order-repository";
import { PrismaCartRepository } from '../../repositories/prisma/prisma-cart-repository';

export class CreateOrderController {
    private createOrder: CreateOrder;
    constructor() {
        this.createOrder = new CreateOrder(
            new PrismaOrderRepository(new PrismaClient()),
            new PrismaCartRepository(new PrismaClient()),
        );
    }
    async create(req: Request, res: Response) {
        try {
            const createOrderRequest: CreateOrderRequest = {
                order_nf: String(req.body.order_nf),
                order_status: Number(req.body.order_status),
                cart_id: Number(req.body.cart_id),
            };
            await this.createOrder.execute(createOrderRequest);
            return res.status(201).send();
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}