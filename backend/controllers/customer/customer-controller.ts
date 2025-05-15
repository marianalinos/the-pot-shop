import { Decimal } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { CustomerRepository } from "../../repositories/customer-repository";
import { CreateCustomerDTO, UpdateCustomerDTO } from "./customer-dto";

export class CustomerController {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createCustomerRequest: CreateCustomerDTO = {
        name: String(req.body.name),
        email: String(req.body.email),
        password: String(req.body.password),
        wallet: new Decimal(req.body.wallet),
      };

      await this.repository.create(createCustomerRequest);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as string;
      const customers = await this.repository.read(
        isNaN(Number(id)) || Number(id) === 0 ? undefined : Number(id)
      );
      return res.status(200).json(customers);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const customer = await this.repository.findById(Number(id));
      return res.status(200).json(customer);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCustomerRequest: UpdateCustomerDTO = {
        id: Number(req.params.id),
        name: String(req.body.name),
        email: String(req.body.email),
        password: String(req.body.password),
        wallet: new Decimal(req.body.wallet),
      };

      const updatedCustomer = await this.repository.update(
        updateCustomerRequest
      );
      return res.status(200).json(updatedCustomer);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await this.repository.delete(id);
      return res.status(200).json({ id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
