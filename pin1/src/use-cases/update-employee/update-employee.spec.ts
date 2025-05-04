import { describe, it, expect } from 'vitest';
import { UpdateEmployee } from './update-employee';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';
import { Employee } from '../../entities/employee';

describe('update employee', () => {
	it('should be able to update an employee', () => {
		const updateEmployee = new UpdateEmployee(
			new InMemoryEmployeeRepository([
				new Employee(1, '123123', 1, new Date(), new Date()),
			]),
		);

		expect(
			updateEmployee.execute({
				id: 1,
				pis: '321321',
				user_id: 2,
			}),
		).resolves.toBeInstanceOf(Employee);
	});

	it('should not be able to update an employee that does not exist', () => {
		const updateEmployee = new UpdateEmployee(
			new InMemoryEmployeeRepository(),
		);

		expect(
			updateEmployee.execute({
				id: 1,
				pis: '321321',
				user_id: 2,
			}),
		).rejects.toThrowError('Employee not found');
	});

	it('should not be able to update an employee with an existing pis', () => {
		const updateEmployee = new UpdateEmployee(
			new InMemoryEmployeeRepository([
				new Employee(1, '123123', 1, new Date(), new Date()),
				new Employee(2, '321321', 2, new Date(), new Date()),
			]),
		);

		expect(
			updateEmployee.execute({
				id: 1,
				pis: '321321',
				user_id: 2,
			}),
		).rejects.toThrowError('PIS already exists');
	});

	it('should not be able to update an employee with an existing user_id', () => {
		const updateEmployee = new UpdateEmployee(
			new InMemoryEmployeeRepository([
				new Employee(1, '123123', 1, new Date(), new Date()),
				new Employee(2, '321321', 2, new Date(), new Date()),
			]),
		);

		expect(
			updateEmployee.execute({
				id: 1,
				pis: '321213',
				user_id: 2,
			}),
		).rejects.toThrowError('User already exists');
	});
});
