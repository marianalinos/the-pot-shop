import { describe, it, expect } from 'vitest';
import { Client } from '../../entities/client';
import { InMemoryClientRepository } from '../../repositories/in-memory/in-memory-client-repository';
import { UpdateClient } from './update-client';

describe('update a client', () => {

  it('should be able to update a client', () => {
    const updateClient = new UpdateClient(
      new InMemoryClientRepository([
        new Client(1, 20, 1, new Date(), new Date()),
      ]),
    );
    expect(
      updateClient.execute({
        id: 1,
        age: 22,
      }),
    ).resolves.toBeUndefined();
    });

  it('should not be able to update a client with age less than 18', () => {
    const updateClient = new UpdateClient(new InMemoryClientRepository(
      [new Client(1, 20, 1, new Date(), new Date())],
    ));
    expect(
      updateClient.execute({
        id: 1,
        age: 17,
      }),
    ).rejects.toEqual(new Error('Age must be greater than or equal to 18'));
  });

  it('should not be able to update a client with age greater than 120', () => {
    const updateClient = new UpdateClient(new InMemoryClientRepository(
      [new Client(1, 20, 1, new Date(), new Date())],
    ));
    expect(
      updateClient.execute({
        id: 1,
        age: 121,
      }),
    ).rejects.toEqual(new Error('Age must be less than or equal to 120'));
  });

  it('should not be able to update a client with an non-existing id', () => {
    const updateClient = new UpdateClient(new InMemoryClientRepository(
      [new Client(1, 20, 1, new Date(), new Date())],
    ));
    expect(
      updateClient.execute({
        id: 2,
        age: 22,
      }),
    ).rejects.toEqual(new Error('Client not found'));
  });
});