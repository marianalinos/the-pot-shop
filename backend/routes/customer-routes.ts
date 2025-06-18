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
router.get('/name/:customer_name', (req, res) => controller.findByName(req, res));
// @ts-ignore
router.get('/:customer_id', (req, res) => controller.findById(req, res));
// @ts-ignore
router.post('/', (req, res) => controller.create(req, res));
// @ts-ignore
router.put('/:customer_id', (req, res) => controller.update(req, res));
// @ts-ignore
router.delete('/:customer_id', (req, res) => controller.delete(req, res));
// @ts-ignore
router.patch('/:customer_id/wallet', (req, res) => controller.updateWallet(req, res));

export default router;