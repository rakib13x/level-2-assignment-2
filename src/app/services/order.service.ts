/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrder } from '../interfaces/order.interface';
import { OrderModel } from '../model/order.model';

const createOrderIntoDb = async (
  email: string,
  productId: string,
  price: number,
  quantity: number,
) => {
  const order: TOrder = {
    email,
    productId,
    price,
    quantity,
  };
  const result = await OrderModel.create(order);
  return result;
};

const getOrders = async (email?: string) => {
  try {
    if (email) {
      const result = await OrderModel.find({ email });
      return result.length ? result : null;
    } else {
      const result = await OrderModel.find();
      return result;
    }
  } catch (error: any) {
    throw new Error('Error fetching orders: ' + error.message);
  }
};

export const OrderServices = {
  createOrderIntoDb,
  getOrders,
};
