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
    await this.prisma.customer.create({
      data: {
        customer_name: data.customer_name,
        email: data.email,
        password: data.password,
        wallet: data.wallet,
      },
    });
  }
  async findById(customer_id: number): Promise<Customer | null> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        customer_id: customer_id,
      },
    });

    if (!customer) {
      return null;
    }

    return new Customer(
      customer.customer_id,
      customer.customer_name,
      customer.email,
      customer.password,
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
          customer.email,
          customer.password,
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
        email: data.email,
        password: data.password,
        wallet: data.wallet
      },
    });
    return new Customer(
        updatedCustomer.customer_id,
        updatedCustomer.customer_name,
        updatedCustomer.email,
        updatedCustomer.password,
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
