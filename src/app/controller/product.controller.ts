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
    const { searchTerm } = req.query;
    const regex = searchTerm
      ? new RegExp(searchTerm as string, "i")
      : undefined;
    const products = await ProductServices.getAllProductsFromDb(regex);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateProductInDb(
      productId,
      updateData
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product is updated successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDb(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product is deleted successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const { searchTerm } = req.query;

//     if (!searchTerm || typeof searchTerm !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid search term.",
//       });
//     }

//     const regex = new RegExp(searchTerm, "i");
//     const result = await ProductServices.searchProductFromDb(regex);

//     res.status(200).json({
//       success: true,
//       message: `Products matching search term '${searchTerm}' fetched successfully!`,
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong.",
//       error: error.message,
//     });
//   }
// };

export const ProductControllers = {
  createProduct,

  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
