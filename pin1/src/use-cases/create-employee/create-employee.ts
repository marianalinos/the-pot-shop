import { EmployeeRepository } from '../../repositories/employee-repository';
import { CreateEmployeeDTO } from './create-employee-dto';

export type CreateEmployeeRequest = {
	pis: string;
	user_id: number;
};

export class CreateEmployee {
	private employeeRepository: EmployeeRepository;

	constructor(employeeRepository: EmployeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	async execute({ pis, user_id }: CreateEmployeeRequest) {
		if (await this.employeeRepository.findByPis(pis)) {
			throw new Error('PIS already exists');
		}
		if (await this.employeeRepository.findByUserId(user_id)) {
			throw new Error('User already exists');
		}
		const employee: CreateEmployeeDTO = {
			pis,
			user_id,
		};
		await this.employeeRepository.create(employee);
	}
}
