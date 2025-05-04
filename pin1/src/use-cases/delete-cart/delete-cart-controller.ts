import { Request, Response } from 'express';
import { DeleteCart } from './delete-user';
import { PrismaClient } from '@prisma/client';
import { PrismaCartRepository } from '../../repositories/prisma/prisma-cart-repository';

export class DeleteCartController {
    private deleteCart: DeleteCart;

    constructor() {
        this.deleteCart = new DeleteCart(
            new PrismaCartRepository(new PrismaClient()),
        );
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.deleteCart.execute(Number(id));
            return res.status(200).send();
        }
        catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}