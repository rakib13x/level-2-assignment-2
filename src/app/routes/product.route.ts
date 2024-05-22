import express from "express";
import { ProductControllers } from "../controller/product.controller";

const router = express.Router();

router.post("/create-product", ProductControllers.createProduct);

export const productRoutes = router;
