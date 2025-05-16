import express from "express";
import { CartProductController } from "../controllers/cart-product/cart-product-controller";
import { PrismaClient } from "@prisma/client";
import { PrismaCartProductRepository } from "../repositories/prisma/prisma-cart-product-repository";

const router = express.Router();

const repository = new PrismaCartProductRepository(new PrismaClient());
const controller = new CartProductController(repository);

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

export default router;