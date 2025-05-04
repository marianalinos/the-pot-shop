import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { PrismaClientAddressRepository } from '../../repositories/prisma/prisma-clientAddress-repository';
import { DeleteClientAddress } from './delete-clientAddress';

export class DeleteClientAddressController {
    private deleteClientAddress: DeleteClientAddress;

    constructor() {
        this.deleteClientAddress = new DeleteClientAddress(
            new PrismaClientAddressRepository(new PrismaClient()),
        );
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            await this.deleteClientAddress.execute(Number(id));
            return res.status(200).send();
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}