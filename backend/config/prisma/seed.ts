import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  // Seed para User
  await prisma.user.createMany({
    data: [
      {
        user_email: 'joao@gmail.com',
        user_secret: 'hash_da_senha',
      },
      {
        user_email: 'maria@gmail.com',
        user_secret: 'hash_da_senha',
      },
    ],
  });

  // Seed para Employee
  await prisma.employee.createMany({
    data: [
      {
        empl_pis: '123456789',
        user_id: 1,
      },
    ],
  });

  // Seed para Client
  await prisma.client.createMany({
    data: [
      {
        clie_age: 25,
        user_id: 2,
      },
    ],
  });

  // Seed para ClientCards
  await prisma.clientCards.createMany({
    data: [
      {
        clca_cvv: 123,
        clca_holder_name: 'João Silva',
        clca_cpf: '12345678901',
        clca_number: '1234123412341234',
        client_id: 1,
      },
    ],
  });

  // Seed para ClientAddress
  await prisma.clientAddress.createMany({
    data: [
      {
        clad_street: 'Rua A',
        clad_number: '123',
        clad_other: 'apto 101',
        clad_cep: '12345678',
        clad_city: 'São Paulo',
        clad_state: 'SP',
        client_id: 1,
      },
    ],
  });

  // Seed para Catalogue
  await prisma.catalogue.createMany({
    data: [
      {
        cata_id: 1,
        cata_title: 'Catálogo 1',
      },
    ],
  });

  // Seed para Product
  await prisma.product.createMany({
    data: [
      {
        prod_name: 'Produto 1',
        prod_price: 10.5,
        prod_description: 'Descrição do produto 1',
        prod_image: 'imagem1.jpg',
        prod_type: 1,
        cata_id: 1,
      },
    ],
  });

  // Seed para Cart
  await prisma.cart.createMany({
    data: [
      {
        clie_id: 1,
      },
    ],
  });

  // Seed para Item
  await prisma.item.createMany({
    data: [
      {
        prod_id: 1,
        cart_id: 1,
      },
    ],
  });

  // Seed para Order
  await prisma.order.createMany({
    data: [
      {
        orde_nf: '1234567890',
        orde_status: 1,
        cart_id: 1,
      },
    ],
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
