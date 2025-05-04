import { describe, it, expect } from 'vitest';
import { InMemoryClientAddressRepository } from '../../repositories/in-memory/in-memory-clientAddress-repository';
import { UpdateClientAddress } from './update-clientAddress';
import { ClientAddress } from '../../entities/clientAddress';

describe('update clientAddress', () => {
  it ('should be able to update a clientAddress', () => {
    const updateClientAddress = new UpdateClientAddress(
      new InMemoryClientAddressRepository([
        new ClientAddress(1, 'street', 'number', 'other', 'cep', 'city', 'state', 1, new Date(), new Date())
      ]),
    );
    expect(updateClientAddress.execute({
      clad_id: 1,
      clad_street: 'streets',
      clad_number: 'numbers',
      clad_other: 'others',
      clad_cep: 'ceps',
      clad_city: 'citys',
      clad_state: 'states',
      client_id: 1,
    })).resolves.toBeInstanceOf(ClientAddress);
  });

  it ('should not be able to update a clientAddress that does not exist', () => {
    const updateClientAddress = new UpdateClientAddress(new InMemoryClientAddressRepository());
    expect(updateClientAddress.execute({
      clad_id: 6,
      clad_street: 'streets',
      clad_number: 'numbers',
      clad_other: 'others',
      clad_cep: 'ceps',
      clad_city: 'citys',
      clad_state: 'states',
      client_id: 1,
    })).rejects.toThrowError('ClientAddress not found');
  });
});