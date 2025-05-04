import { Employee } from '../../entities/employee';
import { EmployeeRepository } from '../../repositories/employee-repository';
import { UpdateEmployeeDTO } from './update-employee-dto';

export interface UpdateEmployeeRequest {
	id: number;
	pis: string;
	user_id: number;
}

export class UpdateEmployee {
	private employeeRepository: EmployeeRepository;

	constructor(employeeRepository: EmployeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	async execute({
		id,
		pis,
		user_id,
	}: UpdateEmployeeRequest): Promise<Employee> {
		if (!(await this.employeeRepository.findById(id))) {
			throw new Error('Employee not found');
		}
		const employeeWithSamePis = await this.employeeRepository.findByPis(pis);
		if (employeeWithSamePis && employeeWithSamePis.getId() !== id) {
			throw new Error('PIS already exists');
		}
		const employeeWithSameUserId = await this.employeeRepository.findByUserId(user_id);
		if (employeeWithSameUserId && employeeWithSameUserId.getId() !== id) {
			throw new Error('User already exists');
		}
		const user: UpdateEmployeeDTO = {
			id,
			pis,
			user_id,
		};
		return await this.employeeRepository.update(user);
	}
}
