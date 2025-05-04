import { describe, expect, it } from "vitest";
import { UpdateOrder } from "./update-order";
import { InMemoryOrderRepository } from "../../repositories/in-memory/in-memory-order-repository";
import { Order } from "../../entities/order";
import { Cart } from "../../entities/cart";
import { InMemoryCartRepository } from "../../repositories/in-memory/in-memory-cart-repository";

describe("update an order", () => {
  it("should be able to update an order", async () => {
    const updateOrder = new UpdateOrder(
      new InMemoryOrderRepository([
        new Order(1, 1, 1, "123456", new Date(), new Date()),
      ]),
      new InMemoryCartRepository([new Cart(1, 1, new Date(), new Date())])
    );

    expect(
      updateOrder.execute({
        id: 1,
        cart_id: 1,
        orde_status: 1,
        orde_nf: "123456",
      })
    ).resolves.toBeInstanceOf(Order);
  });

  it("should not be able to update an order that does not exist", () => {
    const updateOrder = new UpdateOrder(
      new InMemoryOrderRepository(),
      new InMemoryCartRepository()
    );

    expect(
      updateOrder.execute({
        id: 1,
        cart_id: 1,
        orde_status: 1,
        orde_nf: "123456",
      })
    ).rejects.toThrowError("Order not found");
  });
});
