import express from "express";
import { OrderController } from "../controllers/order/order-controller";
import { PrismaClient } from "@prisma/client";
import { PrismaOrderRepository } from "../repositories/prisma/prisma-order-repository";

const router = express.Router();

const repository = new PrismaOrderRepository(new PrismaClient());
const controller = new OrderController(repository);

// @ts-ignore
router.get("/", (req, res) => controller.read(req, res));
// @ts-ignore
router.get("/:id", (req, res) => controller.findById(req, res));
// @ts-ignore
router.post("/", (req, res) => controller.create(req, res));
// @ts-ignore
router.put("/:id", (req, res) => controller.update(req, res));
// @ts-ignore
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;