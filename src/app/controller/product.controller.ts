import { Request, Response } from "express";
import { ProductServices } from "../services/product.service";
import productValidationSchema from "../validations/product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const validateData = productValidationSchema.parse(product);
    const result = await ProductServices.createProductIntoDb(validateData);
    res.status(200).json({
      success: true,
      message: "Product is added successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDb();

    res.status(200).json({
      success: true,
      message: "Products are retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
