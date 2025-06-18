import { Customer } from "../../models/customer";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "../../controllers/customer/customer-dto";
import { CustomerRepository } from "../customer-repository";

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  constructor(customers: Customer[] = []) {
    this.customers = customers;
  }
  async create(data: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = new Customer(
      this.customers.length + 1,
      data.customer_name,
      data.wallet,
    );
    this.customers.push(newCustomer);
    return newCustomer;
  }
  async read(type: number | undefined): Promise<Customer[]> {
    if (type) {
      const customers = this.customers.filter(
        (customer) => customer.getId() === type
      );
      return customers;
    }
    return this.customers;
  }
  async findByName(customer_name: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.getCustomerName() === customer_name);
    return customer ?? null;
  }
  async findById(customer_id: number): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.getId() === customer_id
    );
    return customer ?? null;
  }
  async update(data: UpdateCustomerDTO): Promise<Customer> {
    const index = this.customers.findIndex(
      (customerRepo) => customerRepo.getId() === data.customer_id
    );
    const newCustomer = new Customer(
      data.customer_id,
      data.customer_name,
      data.wallet,
    );
    this.customers[index] = newCustomer;
    return newCustomer;
  }
  async delete(customer_id: number): Promise<void> {
    const index = this.customers.findIndex(
      (customer) => customer.getId() === customer_id
    );
    this.customers.splice(index, 1);
  }
  async updateWallet(customer_id: number, amount: number): Promise<Customer> {
    const customer = this.customers.find(
      (customerRepo) => customerRepo.getId() === customer_id
    );
    if (!customer) {
      throw new Error("Customer not found");
    }
    if (customer.getWallet().minus(amount).lessThanOrEqualTo(0)) {
      throw new Error("O valor vai negativar a carteira e não é permitido");
    }
    customer.setWallet(customer.getWallet().add(amount));
    const index = this.customers.findIndex(
      (customerRepo) => customerRepo.getId() === customer_id
    );
    this.customers[index] = customer;
    return customer;
  }
}
