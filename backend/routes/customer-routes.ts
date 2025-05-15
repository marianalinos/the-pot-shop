import express from 'express';
import { CustomerController } from '../controllers/customer/customer-controller';
import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../repositories/prisma/prisma-customer-repository';

const router = express.Router();

const repository = new PrismaCustomerRepository(new PrismaClient());

const controller = new CustomerController(repository);

// @ts-ignore
router.get('/', (req, res) => controller.read(req, res));
// @ts-ignore
router.get('/:id', (req, res) => controller.findById(req, res));
// @ts-ignore
router.post('/', (req, res) => controller.create(req, res));
// @ts-ignore
router.put('/:id', (req, res) => controller.update(req, res));
// @ts-ignore
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;