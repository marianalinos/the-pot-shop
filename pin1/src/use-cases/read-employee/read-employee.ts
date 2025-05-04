import { Employee } from '../../entities/employee';
import { EmployeeRepository } from '../../repositories/employee-repository';

export class ReadEmployee {
	private employeeRepository: EmployeeRepository;

	constructor(employeeRepository: EmployeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	async execute(): Promise<Employee[]> {
		return await this.employeeRepository.read();
	}
}
