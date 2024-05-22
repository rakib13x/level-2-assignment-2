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
    const result = await ProductServices.getAllProductsFromDb();

    res.status(200).json({
      success: true,
      message: "Products are retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleProductFromDb = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDb(productId);

    res.status(200).json({
      success: true,
      message: "Product is retrieved successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProductFromDb,
};
