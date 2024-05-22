import express from "express";
import { OrderControllers } from "../controller/order.controller";

const router = express.Router();

router.post("/create-order", OrderControllers.createOrder);
router.get("/", OrderControllers.getAllOrders);
router.get("/", OrderControllers.getOrdersByUserEmail);

export const orderRoutes = router;
