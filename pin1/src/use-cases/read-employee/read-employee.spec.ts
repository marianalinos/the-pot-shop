import { expect, it, describe } from 'vitest';
import { ReadEmployee } from './read-employee';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';

describe('read employees ', () => {
	it('should be able to read employees', () => {
		const readEmployee = new ReadEmployee(new InMemoryEmployeeRepository());

		expect(readEmployee.execute()).resolves.toBeInstanceOf(Array);
	});
});
