import { it, expect, describe } from 'vitest';
import { CreateEmployee } from './create-employee';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';
import { Employee } from '../../entities/employee';

describe('Create Employee', () => {
	it('should be able to create an employee', () => {
		const createEmployee = new CreateEmployee(
			new InMemoryEmployeeRepository(),
		);

		expect(
			createEmployee.execute({
				pis: '123456789',
				user_id: 1,
			}),
		).resolves.toBeUndefined();
	});

	it('should not be able to create an employee with an pis that already exists', () => {
		const createEmployee = new CreateEmployee(
			new InMemoryEmployeeRepository([
				new Employee(1, '123456789', 1, new Date(), new Date()),
			]),
		);

		expect(
			createEmployee.execute({
				pis: '123456789',
				user_id: 2,
			}),
		).rejects.toThrowError('PIS already exists');
	});

	it('should not be able to create an employee with an user_id that already exists', () => {
		const createEmployee = new CreateEmployee(
			new InMemoryEmployeeRepository([
				new Employee(1, '123456789', 1, new Date(), new Date()),
			]),
		);

		expect(
			createEmployee.execute({
				pis: '987654321',
				user_id: 1,
			}),
		).rejects.toThrowError('User already exists');
	});
});
