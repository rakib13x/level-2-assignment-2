import { Request, Response } from "express";
import { OrderServices } from "../services/order.service";
import { ProductServices } from "../services/product.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;

    const product = await ProductServices.getSingleProductFromDb(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    const result = await OrderServices.createOrderIntoDb(
      email,
      productId,
      price,
      quantity
    );

    const remainingQuantity = product.inventory.quantity - quantity;
    const inStock = remainingQuantity > 0;
    await ProductServices.updateProductInDb(productId, {
      inventory: {
        quantity: remainingQuantity,
        inStock: inStock,
      },
    });

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDb();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
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

const getOrdersByUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getOrdersByUserEmailFromDb(
      email as string
    );

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: result,
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

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByUserEmail,
};
