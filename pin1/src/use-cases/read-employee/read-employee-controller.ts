import { Request, Response } from 'express';
import { ReadEmployee } from './read-employee';
import { PrismaEmployeeRepository } from '../../repositories/prisma/prisma-employee-repository';
import { PrismaClient } from '@prisma/client';

export class ReadEmployeeController {
	private readEmployee: ReadEmployee;

	constructor() {
		this.readEmployee = new ReadEmployee(
			new PrismaEmployeeRepository(new PrismaClient()),
		);
	}

	async read(req: Request, res: Response): Promise<Response> {
		try {
			const employees = await this.readEmployee.execute();
			return res.status(200).json(employees);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
