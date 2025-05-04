import { PrismaClient } from "@prisma/client";
import { PrismaCartRepository } from "../../repositories/prisma/prisma-cart-repository";
import { ReadCart } from "./read-cart";
import { Request, Response } from 'express';


export class ReadCartController {
    private readCart: ReadCart;

    constructor() {
        this.readCart = new ReadCart(
            new PrismaCartRepository(new PrismaClient()),
        );
    }

    async read(req: Request, res: Response): Promise<Response> {
        try{ 
            const carts = await this.readCart.execute();
            return res.status(200).json(carts);
        } catch (error: any) {
            return res.status(400).json({ message: error.message});
        }
    }

    async readById(req: Request, res: Response): Promise<Response> {
        try{ 
            const { id } = req.params;
            const cart = await this.readCart.readById(Number(id));
            return res.status(200).json(cart);
        } catch (error: any) {
            return res.status(400).json({ message: error.message});
        }
    }
}