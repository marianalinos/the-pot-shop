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
    const createData: any = {
      total: 0,
    };

    if (data.customer_id) {
      createData.customer = {
        connect: { customer_id: data.customer_id },
      };
    }

    const cart = await this.prisma.cart.create({
      data: createData,
      include: {
        coupon: true,
        customer: true,
      },
    });

    return new Cart(
      cart.cart_id,
      cart.total,
      cart.coupon?.code || null,
      cart.customer?.customer_id
    );
  }
  async read(type: number | undefined): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany({
      where: {
        cart_id: type,
      },
    });
    return carts.map(
      (cart) =>
        new Cart(cart.cart_id, cart.total, cart.coupon_code, cart.customer_id)
    );
  }

  async findById(cart_id: number): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { cart_id },
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
      ? new Cart(cart.cart_id, cart.total, cart.coupon_code, cart.customer_id)
      : null;
  }

  async applyCoupon(cart_id: number, coupon_code: string): Promise<Cart> {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: coupon_code },
    });
    if (!coupon) {
      throw new Error(`Cupom ${coupon_code} não encontrado`);
    }
    const cart = await this.prisma.cart.update({
      where: { cart_id },
      data: {
        coupon: {
          connect: { code: coupon_code },
        },
      },
    });
    await this.calculateTotal(cart_id);
    return new Cart(
      cart.cart_id,
      cart.total,
      cart.coupon_code,
      cart.customer_id
    );
  }

  async findByCustomerId(customer_id: number): Promise<Cart | null> {
    const cart = await this.prisma.cart.findFirst({
      where: { customer_id, order: null },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        coupon: true,
      },
    });
    return cart
      ? new Cart(cart.cart_id, cart.total, cart.coupon_code, cart.customer_id)
      : null;
  }

  async update(data: UpdateCartDTO): Promise<Cart> {
    const cart = await this.prisma.cart.update({
      where: { cart_id: data.cart_id },
      data: {
        coupon_code: data.coupon_code === null ? null : data.coupon_code,
        customer_id: data.customer_id === null ? null : data.customer_id,
      },
    });
    await this.calculateTotal(data.cart_id);
    return new Cart(
      cart.cart_id,
      cart.total,
      cart.coupon_code,
      cart.customer_id
    );
  }

  async delete(cart_id: number): Promise<void> {
    await this.prisma.cart.delete({ where: { cart_id } });
  }

  async calculateTotal(cart_id: number): Promise<Decimal> {
    const cart = await this.prisma.cart.findUnique({
      where: { cart_id },
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
      where: { cart_id },
      data: { total },
    });

    return total;
  }
}
