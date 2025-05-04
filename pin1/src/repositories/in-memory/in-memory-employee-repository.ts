import { Employee } from '../../entities/employee';
import { CreateEmployeeDTO } from '../../use-cases/create-employee/create-employee-dto';
import { UpdateEmployeeDTO } from '../../use-cases/update-employee/update-employee-dto';
import { EmployeeRepository } from '../employee-repository';

export class InMemoryEmployeeRepository implements EmployeeRepository {
	private employees: Employee[] = [];

	constructor(employees: Employee[] = []) {
		this.employees = employees;
	}

	async create(employee: CreateEmployeeDTO): Promise<void> {
		this.employees.push(
			new Employee(
				this.employees.length + 1,
				employee.pis,
				employee.user_id,
				new Date(),
				new Date(),
			),
		);
	}

	async findByPis(pis: string): Promise<Employee | null> {
		const employee = this.employees.find(
			employee => employee.getPis() === pis,
		);
		if (!employee) {
			return null;
		}
		return employee;
	}

	async findByUserId(user_id: number): Promise<Employee | null> {
		const employee = this.employees.find(
			employee => employee.getUserId() === user_id,
		);
		if (!employee) {
			return null;
		}
		return employee;
	}

	async read(): Promise<Employee[]> {
		return this.employees;
	}

	async update(employee: UpdateEmployeeDTO): Promise<Employee> {
		const index = this.employees.findIndex(
			employeeRepo => employeeRepo.getId() === employee.id,
		);
		const newEmployee = new Employee(
			employee.id,
			employee.pis,
			employee.user_id,
			new Date(),
			this.employees[index].getCreatedAt(),
		);
		this.employees[index] = newEmployee;
		return newEmployee;
	}

	async delete(id: number): Promise<void> {
		const index = this.employees.findIndex(
			employeeRepo => employeeRepo.getId() === id,
		);
		this.employees.splice(index, 1);
	}

	async findById(id: number): Promise<Employee | null> {
		const employee = this.employees.find(
			employee => employee.getId() === id,
		);
		if (!employee) {
			return null;
		}
		return employee;
	}
}
