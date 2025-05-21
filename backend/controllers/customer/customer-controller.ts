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
      const createCustomer: CreateCustomerDTO = {
        customer_name: String(req.body.customer_name),
        email: String(req.body.email),
        password: String(req.body.password),
        wallet: new Decimal(req.body.wallet),
      };

      await this.repository.create(createCustomer);
      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const customer_id = req.query.customer_id as string;
      const customers = await this.repository.read(
        isNaN(Number(customer_id)) || Number(customer_id) === 0 ? undefined : Number(customer_id)
      );
      return res.status(200).json(customers);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { customer_id } = req.params;
      const customer = await this.repository.findById(Number(customer_id));
      return res.status(200).json(customer);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCustomer: UpdateCustomerDTO = {
        customer_id: Number(req.params.customer_id),
        customer_name: String(req.body.customer_name),
        email: String(req.body.email),
        password: String(req.body.password),
        wallet: new Decimal(req.body.wallet),
      };

      const updatedCustomer = await this.repository.update(
        updateCustomer
      );
      return res.status(200).json(updatedCustomer);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const customer_id = Number(req.params.customer_id);
      await this.repository.delete(customer_id);
      return res.status(200).json({ customer_id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
