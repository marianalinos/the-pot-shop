import { describe, it, expect } from 'vitest';
import { ClientAddress } from '../../entities/clientAddress';
import { InMemoryClientAddressRepository } from '../../repositories/in-memory/in-memory-clientAddress-repository';
import { DeleteClientAddress } from './delete-clientAddress';

describe('delete clientAddress', () => {
  it ('should be able to delete a clientAddress', () => {
    const deleteClientAddress = new DeleteClientAddress(
      new InMemoryClientAddressRepository([
        new ClientAddress(1, 'street', 'number', 'other', 'cep', 'city', 'state', 1, new Date(), new Date())
      ]),
    );
    expect(deleteClientAddress.execute(1)).resolves.toBeUndefined();
  });

  it ('should not be able to delete a clientAddress that does not exist', () => {
    const deleteClientAddress = new DeleteClientAddress(new InMemoryClientAddressRepository());
    expect(deleteClientAddress.execute(1)).rejects.toThrowError('ClientAddress not found');
  });
});