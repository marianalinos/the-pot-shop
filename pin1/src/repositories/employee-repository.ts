import { Employee } from '../entities/employee';
import { CreateEmployeeDTO } from '../use-cases/create-employee/create-employee-dto';
import { UpdateEmployeeDTO } from '../use-cases/update-employee/update-employee-dto';

export interface EmployeeRepository {
	create(employee: CreateEmployeeDTO): Promise<void>;
	findByPis(pis: string): Promise<Employee | null>;
	findByUserId(user_id: number): Promise<Employee | null>;
	findById(id: number): Promise<Employee | null>;
	read(): Promise<Employee[]>;
	update(employee: UpdateEmployeeDTO): Promise<Employee>;
	delete(id: number): Promise<void>;
}
