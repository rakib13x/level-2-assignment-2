import { Schema, model } from 'mongoose';
import { TOrder } from '../interfaces/order.interface';

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: [true, 'email is required'], trim: true },
  productId: {
    type: String,
    required: [true, 'productId is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product Price is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
    trim: true,
  },
});

export const OrderModel = model('Order', orderSchema);
