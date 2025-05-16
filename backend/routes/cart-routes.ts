import express from "express";
import { CartController } from "../controllers/cart/cart-controller";
import { PrismaClient } from "@prisma/client";
import { PrismaCartRepository } from "../repositories/prisma/prisma-cart-repository";

const router = express.Router();
const repository = new PrismaCartRepository(new PrismaClient());
const controller = new CartController(repository);

// @ts-ignore
router.post("/", (req, res) => controller.create(req, res));
// @ts-ignore
router.get("/", (req, res) => controller.read(req, res));
// @ts-ignore
router.get("/:id", (req, res) => controller.findById(req, res));
// @ts-ignore
router.put("/:id", (req, res) => controller.update(req, res));
// @ts-ignore
router.delete("/:id", (req, res) => controller.delete(req, res));
// @ts-ignore
router.get('/:id/total', (req, res) => controller.calculateTotal(req, res));

export default router;