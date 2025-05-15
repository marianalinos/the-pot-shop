import { Customer } from "../models/customer";
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "../controllers/customer/customer-dto";

export interface CustomerRepository {
  create(customer: CreateCustomerDTO): Promise<void>;
  read(id: number | undefined): Promise<Customer[]>;
  findById(id: number): Promise<Customer | null>;
  update(customer: UpdateCustomerDTO): Promise<Customer>;
  delete(id: number): Promise<void>;
}