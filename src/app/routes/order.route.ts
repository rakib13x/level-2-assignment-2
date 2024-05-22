import express from "express";
import { OrderControllers } from "../controller/order.controller";

const router = express.Router();

router.post("/create-order", OrderControllers.createOrder);

export const orderRoutes = router;
