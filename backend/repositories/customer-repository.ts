import { Customer } from "../models/customer";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "../controllers/customer/customer-dto";

export interface CustomerRepository {
  create(data: CreateCustomerDTO): Promise<void>;
  read(type: number | undefined): Promise<Customer[]>;
  findByName(name: string): Promise<Customer | null>;
  update(data: UpdateCustomerDTO): Promise<Customer>;
  delete(customer_id: number): Promise<void>;
}