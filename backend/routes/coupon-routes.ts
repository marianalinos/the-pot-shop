import express from 'express';
import { CouponController } from '../controllers/coupon/coupon-controller';
import { PrismaClient } from '@prisma/client';
import { PrismaCouponRepository } from '../repositories/prisma/prisma-coupon-repository';

const router = express.Router();

const repository = new PrismaCouponRepository(new PrismaClient());

const controller = new CouponController(repository);

// @ts-ignore
router.get('/', (req, res) => controller.read(req, res));
// @ts-ignore
router.get('/:id', (req, res) => controller.findById(req, res));
// @ts-ignore
router.get('/code/:code', (req, res) => controller.findByCode(req, res));
// @ts-ignore
router.post('/', (req, res) => controller.create(req, res));
// @ts-ignore
router.put('/:id', (req, res) => controller.update(req, res));
// @ts-ignore
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;