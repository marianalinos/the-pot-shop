import { Customer } from "../models/customer";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "../controllers/customer/customer-dto";

export interface CustomerRepository {
  create(data: CreateCustomerDTO): Promise<Customer>;
  read(type: number | undefined): Promise<Customer[]>;
  findByName(name: string): Promise<Customer | null>;
  findById(customer_id: number): Promise<Customer | null>;
  update(data: UpdateCustomerDTO): Promise<Customer>;
  delete(customer_id: number): Promise<void>;
  updateWallet(customer_id: number, amount: number): Promise<Customer>;
} 