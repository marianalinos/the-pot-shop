import { InMemoryCouponRepository } from "../repositories/in-memory/in-memory-coupon-repository";
import { CreateCouponDTO } from "../controllers/coupon/coupon-dto";

// O "describe" indica o início de um cenário de testes, que está relacionado à criação de cupons.
describe("CreateCoupon", () => {
  let repository: InMemoryCouponRepository;

  // Antes de cada caso de teste, cria uma nova instância do repositório. Isso garante que os testes não compartilhem dados entre si e garante o isolamento.
  beforeEach(() => {
    repository = new InMemoryCouponRepository();
  });

  // O "it" define um caso de teste específico. Neste caso, estamos testando a criação de um cupom com um código único.
  it("o sistema deve permitir criar um cupom com código único", async () => {
    // Definindo os dados do cupom a ser criado.
    const couponData: CreateCouponDTO = {
      code: "UNIQUECODE",
      discount: 10,
    };

    // Chama o método de criação do repositório para criar o cupom.
    await repository.create(couponData);

    // Verifica se o cupom foi criado corretamente, buscando pelo código.
    const created = await repository.findByCode("UNIQUECODE");

    expect(created).not.toBeNull(); // Verifica se o cupom criado não é nulo.
    expect(created?.getCode()).toBe("UNIQUECODE"); // Verifica se o código do cupom criado é o esperado.
  });

  // Este teste verifica se a criação de um cupom com um código duplicado lança um erro, garantindo que os códigos de cupom sejam únicos.
  it("o sistema não deve permitir criar um cupom com um código duplicado", async () => {
    const couponData: CreateCouponDTO = {
      code: "UNIQUECODE",
      discount: 15,
    };

    // Primeiro, cria um cupom com o código "UNIQUECODE".
    await repository.create(couponData);

    // Tenta criar outro cupom com o mesmo código, o que deve falhar.
    // Espera-se que um erro seja lançado, indicando que o código do cupom deve ser único.
    await expect(repository.create(couponData)).rejects.toThrow(
      "Já existe um cupom com esse código" // Mensagem de erro esperada.
    );
  });

  it("o sistema não deve permitir criar um cupom com um desconto negativo", async () => {
    const couponData: CreateCouponDTO = {
      code: "ANOTHERUNIQUECODE",
      discount: -5,
    };

    await expect(repository.create(couponData)).rejects.toThrow(
      "O valor do desconto deve ser positivo"
    );
  });
});
