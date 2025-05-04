import { PrismaClient } from "@prisma/client";
import { PrismaCartRepository } from "../../repositories/prisma/prisma-cart-repository";
import { UpdateCart } from "./update-cart";
import { Request, Response } from 'express';


export class UpdateCartController {
    private updateCart: UpdateCart;

    constructor() {
        this.updateCart = new UpdateCart(
            new PrismaCartRepository(new PrismaClient()),
        );
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const updateCartRequest = {
                id: Number(req.params.id),
                clie_id: Number(req.body.clie_id),
            };
            const cart = await this.updateCart.execute(
                updateCartRequest,
            );
            return res.status(200).json(cart);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}