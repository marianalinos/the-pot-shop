import { PrismaClient } from '@prisma/client';
import { Employee } from '../../entities/employee';
import { CreateEmployeeDTO } from '../../use-cases/create-employee/create-employee-dto';
import { UpdateEmployeeDTO } from '../../use-cases/update-employee/update-employee-dto';
import { EmployeeRepository } from '../employee-repository';

export class PrismaEmployeeRepository implements EmployeeRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(employee: CreateEmployeeDTO): Promise<void> {
		await this.prisma.employee.create({
			data: {
				empl_pis: employee.pis,
				user: {
					connect: {
						user_id: employee.user_id,
					},
				},
			},
			include: {
				user: true,
			},
		});
	}

	async findByUserId(user_id: number): Promise<Employee | null> {
		const employee = await this.prisma.employee.findUnique({
			where: {
				user_id,
			},
		});
		if (!employee) {
			return null;
		}
		return new Employee(
			employee.empl_id,
			employee.empl_pis,
			employee.user_id,
			employee.created_at,
			employee.updated_at,
		);
	}

	async findByPis(pis: string): Promise<Employee | null> {
		const employee = await this.prisma.employee.findUnique({
			where: {
				empl_pis: pis,
			},
		});
		if (!employee) {
			return null;
		}
		return new Employee(
			employee.empl_id,
			employee.empl_pis,
			employee.user_id,
			employee.created_at,
			employee.updated_at,
		);
	}

	async read(): Promise<Employee[]> {
		const employees = await this.prisma.employee.findMany();
		return employees.map(
			(employee: {
				empl_id: number;
				empl_pis: string;
				user_id: number;
				created_at: Date;
				updated_at: Date;
			}) =>
				new Employee(
					employee.empl_id,
					employee.empl_pis,
					employee.user_id,
					employee.created_at,
					employee.updated_at,
				),
		);
	}

	async update(employee: UpdateEmployeeDTO): Promise<Employee> {
		const updatedEmployee = await this.prisma.employee.update({
			where: {
				empl_id: employee.id,
			},
			data: {
				empl_pis: employee.pis,
				user: {
					connect: {
						user_id: employee.user_id,
					},
				},
			},
			include: {
				user: true,
			},
		});
		return new Employee(
			updatedEmployee.empl_id,
			updatedEmployee.empl_pis,
			updatedEmployee.user_id,
			updatedEmployee.created_at,
			updatedEmployee.updated_at,
		);
	}

	async delete(id: number): Promise<void> {
		await this.prisma.employee.delete({
			where: {
				empl_id: id,
			},
		});
	}

	async findById(id: number): Promise<Employee | null> {
		const employee = await this.prisma.employee.findUnique({
			where: {
				empl_id: id,
			},
		});
		if (!employee) {
			return null;
		}
		return new Employee(
			employee.empl_id,
			employee.empl_pis,
			employee.user_id,
			employee.created_at,
			employee.updated_at,
		);
	}
}
