import express from "express";
import { CartController } from "../controllers/cart/cart-controller";
import { PrismaClient } from "@prisma/client";
import { PrismaCartRepository } from "../repositories/prisma/prisma-cart-repository";
import { PrismaCustomerRepository } from "../repositories/prisma/prisma-customer-repository";

const router = express.Router();
const repository = new PrismaCartRepository(new PrismaClient());
const customerRepository = new PrismaCustomerRepository(new PrismaClient());
const controller = new CartController(repository, customerRepository);

// @ts-ignore
router.post("/", (req, res) => controller.create(req, res));
// @ts-ignore
router.get("/", (req, res) => controller.read(req, res));
// @ts-ignore
router.get("/customer/:customer_id", (req, res) => controller.findByCustomerId(req, res));
// @ts-ignore
router.get("/:cart_id", (req, res) => controller.findById(req, res));
// @ts-ignore
router.put("/:cart_id", (req, res) => controller.update(req, res));
// @ts-ignore
router.patch("/:cart_id/coupon", (req, res) => controller.applyCoupon(req, res));
// @ts-ignore
router.delete("/:cart_id", (req, res) => controller.delete(req, res));
// @ts-ignore
router.get('/:cart_id/total', (req, res) => controller.calculateTotal(req, res));

export default router;