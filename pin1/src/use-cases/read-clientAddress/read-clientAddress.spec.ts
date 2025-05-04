import { describe, it, expect } from 'vitest';
import { InMemoryClientAddressRepository } from '../../repositories/in-memory/in-memory-clientAddress-repository';
import { ReadClientAddress } from './read-clientAddress';

describe('read clientAddress', () => {
    it('should be able to read clientAddress', () => {
        const readClientAddress = new ReadClientAddress(new InMemoryClientAddressRepository());
        expect(readClientAddress.execute()).resolves.toBeInstanceOf(Array);
    });
});