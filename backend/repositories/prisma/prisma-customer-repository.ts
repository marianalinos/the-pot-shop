import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "../customer-repository";
import { Customer } from "../../models/customer";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "../../controllers/customer/customer-dto";

export class PrismaCustomerRepository implements CustomerRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async create(data: CreateCustomerDTO): Promise<void> {
    const wallet = Math.floor(Math.random() * 46) + 5;

    await this.prisma.customer.create({
      data: {
        customer_name: data.customer_name,
        wallet: wallet,
      },
    });
  }
  async findByName(customer_name: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        customer_name: customer_name,
      },
    });

    if (!customer) {
      return null;
    }

    return new Customer(
      customer.customer_id,
      customer.customer_name,
      customer.wallet
    );
  }
  async read(type: number | undefined): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany({
      where: {
        customer_id: type,
      },
    });
    return customers.map(
      (customer) =>
        new Customer(
          customer.customer_id,
          customer.customer_name,
          customer.wallet
        )
    );
  }
  async update(data: UpdateCustomerDTO): Promise<Customer> {
    const updatedCustomer = await this.prisma.customer.update({
      where: {
        customer_id: data.customer_id,
      },
      data: {
        customer_name: data.customer_name,
        wallet: data.wallet,
      },
    });
    return new Customer(
      updatedCustomer.customer_id,
      updatedCustomer.customer_name,
      updatedCustomer.wallet
    );
  }
  async delete(customer_id: number): Promise<void> {
    await this.prisma.customer.delete({
      where: {
        customer_id: customer_id,
      },
    });
  }
}
