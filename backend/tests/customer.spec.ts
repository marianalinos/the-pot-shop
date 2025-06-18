import { InMemoryCustomerRepository } from "../repositories/in-memory/in-memory-customer-repository";
import { CreateCustomerDTO } from "../controllers/customer/customer-dto";
import { Decimal } from "@prisma/client/runtime/library";

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
