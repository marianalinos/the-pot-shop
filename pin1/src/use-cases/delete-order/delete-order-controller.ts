import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { PrismaOrderRepository } from "../../repositories/prisma/prisma-order-repository";
import { DeleteOrder } from "./delete-order";

export class DeleteOrderController {
    private deleteOrder: DeleteOrder;

    constructor() {
        this.deleteOrder = new DeleteOrder(
            new PrismaOrderRepository(new PrismaClient()),
        );
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.deleteOrder.execute(Number(id));
            return res.status(200).send();
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}