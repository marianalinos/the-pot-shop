import { describe, it, expect } from "vitest";
import { ClientAddress } from "../../entities/clientAddress";
import { CreateClientAddress } from "./create-clientAddress";
import { InMemoryClientAddressRepository } from "../../repositories/in-memory/in-memory-clientAddress-repository";

describe("Create ClientAddress", () => {
  it("should be able to create a clientAddress", () => {
    const createClientAddress = new CreateClientAddress(
      new InMemoryClientAddressRepository([
        new ClientAddress(
          1,
          "Rua 1",
          "123",
          "Casa",
          "12345678",
          "Cidade",
          "Estado",
          1,
          new Date(),
          new Date()),
      ])
    );
    expect(
      createClientAddress.execute({
        clad_street: "Rua 1",
        clad_number: "123",
        clad_other: "Casa",
        clad_cep: "12345678",
        clad_city: "Cidade",
        clad_state: "Estado",
        client_id: 1,
      }),
    ).resolves.toBeUndefined();
  });
})
