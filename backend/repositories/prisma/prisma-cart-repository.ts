import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { CartRepository } from "../cart-repository";
import { Cart } from "../../models/cart";
import { CreateCartDTO, UpdateCartDTO } from "../../controllers/cart/cart-dto";

export class PrismaCartRepository implements CartRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateCartDTO): Promise<Cart> {
    // 1. Preparar dados básicos
    const createData: any = {
      total: 0,
    };

    // 2. Tratar customer (se existir)
    if (data.customerId) {
      createData.customer = {
        connect: { id: data.customerId },
      };
    }

    // 3. Tratar coupon (se existir)
    if (data.couponCode && data.couponCode !== "null") {
      // Verificar se o cupom existe
      const couponExists = await this.prisma.coupon.findUnique({
        where: { code: data.couponCode },
      });

      if (!couponExists) {
        throw new Error(`Cupom ${data.couponCode} não encontrado`);
      }

      // Conectar usando a relação
      createData.coupon = {
        connect: { code: data.couponCode },
      };
    } else {
      // Não definir nada para coupon quando não houver cupom
      // O Prisma automaticamente definirá como NULL
    }

    // 4. Criar o carrinho
    try {
      const cart = await this.prisma.cart.create({
        data: createData,
        include: {
          coupon: true,
          customer: true,
        },
      });

      return new Cart(
        cart.id,
        cart.total,
        cart.coupon?.code || null,
        cart.customer?.id || null
      );
    } catch (error) {
      console.error("Erro detalhado:", error);
      throw new Error("Falha ao criar carrinho. Verifique os dados.");
    }
  }
  async read(id: number | undefined): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany({
      where: {
        id: id,
      },
    });
    return carts.map(
      (cart) => new Cart(cart.id, cart.total, cart.couponCode, cart.customerId)
    );
  }

  async findById(id: number): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        coupon: true,
        customer: true,
      },
    });
    return cart
      ? new Cart(cart.id, cart.total, cart.couponCode, cart.customerId)
      : null;
  }

  async update(data: UpdateCartDTO): Promise<Cart> {
    const cart = await this.prisma.cart.update({
      where: { id: data.id },
      data: {
        couponCode: data.couponCode === null ? null : data.couponCode,
        customerId: data.customerId === null ? null : data.customerId,
      },
    });
    await this.calculateTotal(data.id);
    return new Cart(cart.id, cart.total, cart.couponCode, cart.customerId);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.cart.delete({ where: { id } });
  }

  async calculateTotal(id: number): Promise<Decimal> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        coupon: true,
      },
    });

    if (!cart) throw new Error("Cart not found");

    let subtotal = cart.products.reduce(
      (sum, item) => sum.add(item.product.price.mul(item.quantity)),
      new Decimal(0)
    );

    let total = cart.coupon
      ? subtotal.sub(subtotal.mul(cart.coupon.discount).div(100))
      : subtotal;

    await this.prisma.cart.update({
      where: { id },
      data: { total },
    });

    return total;
  }
}
