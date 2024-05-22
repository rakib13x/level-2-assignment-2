import { TOrder } from "../interfaces/order.interface";
import { OrderModel } from "../model/order.model";

const createOrderIntoDb = async (
  email: string,
  productId: string,
  price: number,
  quantity: number
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

const getAllOrdersFromDb = async () => {
  const result = await OrderModel.find();
  return result;
};

const getOrdersByUserEmailFromDb = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdersFromDb,
  getOrdersByUserEmailFromDb,
};
