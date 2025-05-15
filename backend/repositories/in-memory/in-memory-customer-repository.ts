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
  async create(customer: CreateCustomerDTO): Promise<void> {
    const newCustomer = new Customer(
      this.customers.length + 1,
      customer.name,
      customer.email,
      customer.password,
      customer.wallet
    );
    this.customers.push(newCustomer);
  }
  async read(id: number | undefined): Promise<Customer[]> {
    if (id) {
      const customers = this.customers.filter(
        (customer) => customer.getId() === id
      );
      return customers;
    }
    return this.customers;
  }
  async findById(id: number): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.getId() === id);
    return customer ?? null;
  }
  async update(customer: UpdateCustomerDTO): Promise<Customer> {
    const index = this.customers.findIndex(
      (customerRepo) => customerRepo.getId() === customer.id
    );
    const newCustomer = new Customer(
      customer.id,
      customer.name,
      customer.email,
      customer.password,
      customer.wallet
    );
    this.customers[index] = newCustomer;
    return newCustomer;
  }
  async delete(id: number): Promise<void> {
    const index = this.customers.findIndex(
      (customer) => customer.getId() === id
    );
    this.customers.splice(index, 1);
  }
}
