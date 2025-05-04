import { Request, Response } from 'express';
import { CreateEmployee, CreateEmployeeRequest } from './create-employee';
import { PrismaEmployeeRepository } from '../../repositories/prisma/prisma-employee-repository';
import { PrismaClient } from '@prisma/client';

export class CreateEmployeeController {
	private createEmployee: CreateEmployee;
	constructor() {
		this.createEmployee = new CreateEmployee(
			new PrismaEmployeeRepository(new PrismaClient()),
		);
	}
	async create(req: Request, res: Response) {
		try {
			const createEmployeeRequest: CreateEmployeeRequest = {
				pis: String(req.body.pis),
				user_id: Number(req.body.user_id),
			};
			await this.createEmployee.execute(createEmployeeRequest);
			return res.status(201).send();
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
