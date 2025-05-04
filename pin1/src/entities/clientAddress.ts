export class ClientAddress {
  clad_id: number;
  clad_street: string;
  clad_number: string;
  clad_other: string;
  clad_cep: string;
  clad_city: string;
  clad_state: string;
  client_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    clad_id: number,
    clad_street: string,
    clad_number: string,
    clad_other: string,
    clad_cep: string,
    clad_city: string,
    clad_state: string,
    client_id: number,
    created_at: Date,
    updated_at: Date
  ) {
    this.clad_id = clad_id;
    this.clad_street = clad_street;
    this.clad_number = clad_number;
    this.clad_other = clad_other;
    this.clad_cep = clad_cep;
    this.clad_city = clad_city;
    this.clad_state = clad_state;
    this.client_id = client_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getId(): number {
    return this.clad_id;
  }

  public getCladStreet(): string {
    return this.clad_street;
  }

  public getCladNumber(): string {
    return this.clad_number;
  }

  public getCladOther(): string {
    return this.clad_other;
  }

  public getCladCep(): string {
    return this.clad_cep;
  }

  public getCladCity(): string {
    return this.clad_city;
  }

  public getCladState(): string {
    return this.clad_state;
  }

  public getClientId(): number {
    return this.client_id;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public getUpdatedAt(): Date {
    return this.updated_at;
  }
}

export type ClientAddressDTO = {
  clad_street: string;
  clad_number: string;
  clad_other: string;
  clad_cep: string;
  clad_city: string;
  clad_state: string;
  client_id: number;
  created_at: Date;
  updated_at: Date;
};
