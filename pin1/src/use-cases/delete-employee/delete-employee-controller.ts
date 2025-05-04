import { Request, Response } from 'express';
import { DeleteEmployee } from './delete-employee';
import { PrismaEmployeeRepository } from '../../repositories/prisma/prisma-employee-repository';
import { PrismaClient } from '@prisma/client';

export class DeleteEmployeeController {
	private deleteEmployee: DeleteEmployee;

	constructor() {
		this.deleteEmployee = new DeleteEmployee(
			new PrismaEmployeeRepository(new PrismaClient()),
		);
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			await this.deleteEmployee.execute(Number(id));
			return res.status(200).send();
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
