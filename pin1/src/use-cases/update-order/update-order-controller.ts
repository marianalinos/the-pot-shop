import { Request, Response } from 'express';
import { UpdateOrder } from './update-order';
import { PrismaOrderRepository } from '../../repositories/prisma/prisma-order-repository';
import { PrismaClient } from '@prisma/client';
import { PrismaCartRepository } from '../../repositories/prisma/prisma-cart-repository';

export class UpdateOrderController {
    private updateOrder: UpdateOrder;

    constructor() {
        this.updateOrder = new UpdateOrder(
            new PrismaOrderRepository(new PrismaClient()),
            new PrismaCartRepository(new PrismaClient()),
        );
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { cart_id, orde_status, orde_nf } = req.body;
            const order = await this.updateOrder.execute({
                id: Number(id),
                cart_id: Number(cart_id),
                orde_status: Number(orde_status),
                orde_nf,
            });
            return res.status(200).json(order);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}