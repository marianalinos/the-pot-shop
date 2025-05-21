import { Decimal } from "@prisma/client/runtime/library";

export interface CreateCustomerDTO {
  customer_name: string;
  email: string;
  password: string;
  wallet: Decimal;
}
export interface UpdateCustomerDTO {
  customer_id: number;
  customer_name: string;
  email: string;
  password: string;
  wallet: Decimal;
}
