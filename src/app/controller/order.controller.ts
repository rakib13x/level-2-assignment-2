/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from '../services/order.service';
import { ProductServices } from '../services/product.service';
import { OrderValidationSchema } from '../validations/order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const validateOrderData = OrderValidationSchema.parse(req.body);

    const { email, productId, price, quantity } = validateOrderData;

    const product = await ProductServices.getSingleProductFromDb(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    const result = await OrderServices.createOrderIntoDb(
      email,
      productId,
      price,
      quantity,
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
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Product is not in the database',
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const orders = await OrderServices.getOrders(email as string);

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'Orders not found',
      });
    }

    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'All orders fetched successfully!',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      error: error?.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
