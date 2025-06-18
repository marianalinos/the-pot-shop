import { InMemoryCustomerRepository } from "../repositories/in-memory/in-memory-customer-repository";
import { CreateCustomerDTO } from "../controllers/customer/customer-dto";
import { Decimal } from "@prisma/client/runtime/library";

describe("CreateCustomer", () => {
  let repository: InMemoryCustomerRepository;

  beforeEach(() => {
    repository = new InMemoryCustomerRepository();
  });

  it("should not allow creating a customer with a duplicated name", async () => {
    const customerData: CreateCustomerDTO = {
      customer_name: "Mariana",
      wallet: new Decimal(100),
    };

    await repository.create(customerData);

    await expect(repository.create(customerData)).rejects.toThrow(
      "Já existe um consumidor com esse nome" 
    );
  });

  it("should not allow creating a customer with a negative wallet value", async () => {
    const customerData: CreateCustomerDTO = {
      customer_name: "João",
      wallet: new Decimal(-50),
    };

    await expect(repository.create(customerData)).rejects.toThrow(
      "O valor da carteira deve ser positivo"
    );
  });
});

describe("UpdateWallet", () => {
  let repository: InMemoryCustomerRepository;

  beforeEach(() => {
    repository = new InMemoryCustomerRepository();
  });

  it("should not allow updating a customer's wallet to a negative value", async () => {
    const customerData: CreateCustomerDTO = {
      customer_name: "Ana",
      wallet: new Decimal(100),
    };

    const customer = await repository.create(customerData);

    await expect(repository.updateWallet(customer.getId(), 100)).rejects.toThrow(
      "O valor vai negativar a carteira e não é permitido"
    );
  });
});
