import { Request, Response } from 'express';
import { UpdateEmployee, UpdateEmployeeRequest } from './update-employee';
import { PrismaEmployeeRepository } from '../../repositories/prisma/prisma-employee-repository';
import { PrismaClient } from '@prisma/client';

export class UpdateEmployeeController {
	private updateEmployee: UpdateEmployee;

	constructor() {
		this.updateEmployee = new UpdateEmployee(
			new PrismaEmployeeRepository(new PrismaClient()),
		);
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const updateEmployeeRequest: UpdateEmployeeRequest = {
				id: Number(req.params.id),
				pis: String(req.body.pis),
				user_id: Number(req.body.user_id),
			};
			const employee = await this.updateEmployee.execute(
				updateEmployeeRequest,
			);
			return res.status(200).json(employee);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
