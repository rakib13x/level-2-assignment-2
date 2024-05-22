import express from "express";
import { ProductControllers } from "../controller/product.controller";

const router = express.Router();

router.post("/create-product", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProductFromDb);

export const productRoutes = router;
