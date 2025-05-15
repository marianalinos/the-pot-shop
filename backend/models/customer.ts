import { Decimal } from "@prisma/client/runtime/library.js";

export class Customer {
  private id: number;
  private name: string;
  private email: string;
  private password: string;
  private wallet: Decimal;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    wallet: Decimal
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.wallet = wallet;
  }
  
  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  } 
  public getWallet(): Decimal {
    return this.wallet;
  }
}