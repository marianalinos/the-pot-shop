import { InMemoryCouponRepository } from "../repositories/in-memory/in-memory-coupon-repository";
import { CouponController } from "../controllers/coupon/coupon-controller";
import { mockRequest, mockResponse } from "./utils/mock-express";

// O "describe" indica o início de um cenário de testes, que está relacionado à criação de cupons.
describe("CreateCoupon", () => {
  let controller: CouponController;

  // Antes de cada caso de teste, cria uma nova instância do repositório. Isso garante que os testes não compartilhem dados entre si e garante o isolamento.
  beforeEach(() => {
    // Cria uma instância do repositório em memória, que simula o armazenamento de cupons sem persistência real
    const repository = new InMemoryCouponRepository();
    controller = new CouponController(repository);
  });

  // O "it" define um caso de teste específico. Neste caso, estamos testando a criação de um cupom com um código único.
  it("o sistema deve permitir criar um cupom com código único", async () => {
    // Simula o request enviado ao controller com os dados do cupom
    const req = mockRequest({
      code: "UNIQUECODE",
      discount: 10,
    });

    // Simula o response que será manipulado pelo controller
    const res = mockResponse();

    // Chama o método real do controller, passando os mocks
    await controller.create(req, res);

    // Verifica se o cupom foi criado corretamente e o status de sucesso foi retornado
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
  });

  // Este teste verifica se a criação de um cupom com um código duplicado lança um erro, garantindo que os códigos de cupom sejam únicos.
  it("o sistema não deve permitir criar um cupom com um código duplicado", async () => {

    // Cria um cupom inicialmente com o código "DUPLICADO"
    const firstReq = mockRequest({ code: "DUPLICADO", discount: 10 });
    const firstRes = mockResponse();
    await controller.create(firstReq, firstRes);

    // Tenta criar outro cupom com o mesmo código, o que deve falhar
    const req = mockRequest({ code: "DUPLICADO", discount: 15 });
    const res = mockResponse();

    await controller.create(req, res);

    // Espera-se que o controller retorne erro de código duplicado
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Já existe um cupom com esse código",
    });
  });

  // Este teste garante que não seja possível criar cupons com valores de desconto inválidos (negativos)
  it("o sistema não deve permitir criar um cupom com um desconto negativo", async () => {
    const req = mockRequest({
      code: "NEGATIVO",
      discount: -5,
    });
    const res = mockResponse();

    // Espera-se que o controller bloqueie a criação e retorne mensagem de erro
    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "O valor do desconto deve ser positivo",
    });
  });
});
