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
  async create(customer: CreateCustomerDTO): Promise<void> {
    await this.prisma.customer.create({
      data: {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        wallet: customer.wallet,
      },
    });
  }
  async findById(id: number): Promise<Customer | null> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!customer) {
      return null;
    }

    return new Customer(
      customer.id,
      customer.name,
      customer.email,
      customer.password,
      customer.wallet
    );
  }
  async read(id: number | undefined): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany({
      where: {
        id: id,
      },
    });
    return customers.map(
      (customer) =>
        new Customer(
          customer.id,
          customer.name,
          customer.email,
          customer.password,
          customer.wallet
        )
    );
  }
  async update(customer: UpdateCustomerDTO): Promise<Customer> {
    const updatedCustomer = await this.prisma.customer.update({
      where: {
        id: customer.id,
      },
      data: {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        wallet: customer.wallet
      },
    });
    return new Customer(
        updatedCustomer.id,
        updatedCustomer.name,
        updatedCustomer.email,
        updatedCustomer.password,
        updatedCustomer.wallet
    );
  }
  async delete(id: number): Promise<void> {
    await this.prisma.customer.delete({
      where: {
        id: id,
      },
    });
  }
}
