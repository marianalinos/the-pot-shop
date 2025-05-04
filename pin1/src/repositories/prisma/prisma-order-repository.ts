import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../order-repository";
import { Order } from "../../entities/order";
import { CreateOrderDTO } from "../../use-cases/create-order/create-order-dto";
import { UpdateOrderDTO } from "../../use-cases/update-order/update-order-dto";

export class PrismaOrderRepository implements OrderRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(order: CreateOrderDTO): Promise<void> {
        await this.prisma.order.create({
            data: {
                orde_nf: order.order_nf,
                orde_status: order.order_status,
                cart_id: order.cart_id,
            },
        });
    }

    async findByNF(order_nf: string): Promise<Order | null> {
        const order = await this.prisma.order.findFirst({
            where: {
                orde_nf: order_nf,
            },
        });
        
        if (!order) {
            return null;
        }

        return new Order(
            order.orde_id, 
            order.orde_status,
            order.cart_id,
            order.orde_nf,
            order.created_at,
            order.updated_at,
        );
    }

    async findByCartId(cart_id: number): Promise<Order | null> {
        const order = await this.prisma.order.findFirst({
            where: {
                cart_id: cart_id,
            }
            }, 
        );

        if (!order) {
            return null;
        }
        return new Order(
            order.orde_id,
            order.orde_status,
            order.cart_id,
            order.orde_nf,
            order.created_at,
            order.updated_at,
        );
    }

    async findById(id: number): Promise<Order | null> {
        const order = await this.prisma.order.findUnique({
            where: {
                orde_id: id,
            },
        });
        if (!order) {
            return null;
        }
        return new Order(
            order.orde_id,
            order.orde_status,
            order.cart_id,
            order.orde_nf,
            order.created_at,
            order.updated_at,
        );
    }
    
    async read(): Promise<Order[]> {
        const orders = await this.prisma.order.findMany();
        return orders.map(
            (order: {
                orde_id: number;
                orde_status: number;
                cart_id: number;
                orde_nf: string;
                created_at: Date;
                updated_at: Date;
            }) => 
                new Order(
                    order.orde_id,
                    order.cart_id,
                    order.orde_status,
                    order.orde_nf,
                    order.created_at,
                    order.updated_at,
            )
    )}

    async update(order: UpdateOrderDTO): Promise<Order> {
        const updatedOrder = await this.prisma.order.update({
            where: {
                orde_id: order.id,
            },
            data: {
                cart_id: order.cart_id,
                orde_status: order.orde_status,
                orde_nf: order.orde_nf,
            },
        });

        return new Order(
            updatedOrder.orde_id,
            updatedOrder.cart_id,
            updatedOrder.orde_status,
            updatedOrder.orde_nf,
            updatedOrder.created_at,
            updatedOrder.updated_at,
        );
    }

    async delete(id: number): Promise<void> {
        await this.prisma.order.delete({
            where: {
                orde_id: id,
            },
        });
    }
}