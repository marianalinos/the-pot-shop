import { Decimal } from "@prisma/client/runtime/library";

export interface CreateCustomerDTO {
  name: string;
  email: string;
  password: string;
  wallet: Decimal;
}
export interface UpdateCustomerDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  wallet: Decimal;
}
