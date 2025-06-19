import { InMemoryCustomerRepository } from "../repositories/in-memory/in-memory-customer-repository";
import { CustomerController } from "../controllers/customer/customer-controller";
import { mockRequest, mockResponse } from "./utils/mock-express";

// Este roteiro de testes verifica a funcionalidade de atualização da carteira de um cliente.
describe("UpdateWallet", () => {
  let controller: CustomerController;

  beforeEach(() => {
    const repository = new InMemoryCustomerRepository();
    controller = new CustomerController(repository);
  });

  it("sistema não deve permitir atualizar a carteira de um cliente para um valor negativo", async () => {
    const createReq = mockRequest({
      customer_name: "Ana",
      wallet: 100,
    });
    const createRes = mockResponse();
    await controller.create(createReq, createRes);

    expect(createRes.status).toHaveBeenCalledWith(201);
    expect(createRes.send).toHaveBeenCalled();

    // Tenta subtrair 200 da carteira
    const updateReq = mockRequest(
      { amount: 200 }, // em UpdateWallet, o valor de amount é negativado da carteira, por isso usamos um valor positivo aqui
      { customer_id: "1" } // params
    );
    const updateRes = mockResponse();

    await controller.updateWallet(updateReq, updateRes);

    expect(updateRes.status).toHaveBeenCalledWith(400);
    expect(updateRes.json).toHaveBeenCalledWith({
      message: "O valor vai negativar a carteira e não é permitido",
    });
  });
});
