import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed para User
  await prisma.customer.create({
    data: {
      customer_name: "Mariana",
      wallet: 50,
    },
  });

  // Seed para Coupon
  await prisma.coupon.createMany({
    data: [
      {
        code: "CUPOM50",
        discount: 50,
      },
      {
        code: "CUPOM20",
        discount: 20,
      },
      {
        code: "CUPOM80",
        discount: 80,
      },
    ],
  });

  // Seed para Product
  await prisma.product.createMany({
    data: [
      {
        product_name: "??? pot",
        price: 5,
        image:
          "https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/73/Potion_of_Weakness_JE2_BE2.png",
      },
      {
        product_name: "Swiftness pot",
        price: 15,
        image:
          "https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/58/Potion_of_Swiftness_JE3.png",
      },
      {
        product_name: "Healing pot",
        price: 20,
        image:
          "https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3e/Potion_of_Healing_JE2_BE2.png",
      },
    ],
  });

  // Seed para criar carrinho
  await prisma.cart.create({
    data: {
      customer_id: 1,
      total: 0,
    },
  });

  // Seed para criar itens no carrinho
  await prisma.cartProduct.create({
    data: {
      cart_id: 1,
      product_id: 1,
      quantity: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
