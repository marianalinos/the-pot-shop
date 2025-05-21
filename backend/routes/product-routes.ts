import express from 'express';
import { ProductController } from '../controllers/product/product-controller';
import { PrismaClient } from '@prisma/client';
import { PrismaProductRepository } from '../repositories/prisma/prisma-product-repository';

const router = express.Router();

const repository = new PrismaProductRepository(new PrismaClient());

const controller = new ProductController(repository);

// @ts-ignore
router.get('/', (req, res) => controller.read(req, res));
// @ts-ignore
router.get('/:product_id', (req, res) => controller.findById(req, res));
// @ts-ignore
router.post('/', (req, res) => controller.create(req, res));
// @ts-ignore
router.put('/:product_id', (req, res) => controller.update(req, res));
// @ts-ignore
router.delete('/:product_id', (req, res) => controller.delete(req, res));

export default router;