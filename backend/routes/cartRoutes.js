import express from "express";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

router.get("/", cartController.getCarts);
router.get("/:id", cartController.getCart);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

export default router;
