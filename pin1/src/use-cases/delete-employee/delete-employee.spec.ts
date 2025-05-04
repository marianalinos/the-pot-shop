import { it, describe, expect } from 'vitest';
import { DeleteEmployee } from './delete-employee';
import { Employee } from '../../entities/employee';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';

describe('delete employee', () => {
	it('should be able to delete employee', () => {
		const deleteEmployee = new DeleteEmployee(
			new InMemoryEmployeeRepository([
				new Employee(1, '123123', 1, new Date(), new Date()),
			]),
		);

		expect(deleteEmployee.execute(1)).resolves.toBeUndefined();
	});

	it('should not be able to delete employee that does not exist', () => {
		const deleteEmployee = new DeleteEmployee(
			new InMemoryEmployeeRepository(),
		);
		expect(deleteEmployee.execute(2)).rejects.toThrowError(
			'Employee not found',
		);
	});
});
