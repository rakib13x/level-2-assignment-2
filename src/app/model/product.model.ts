import { Schema, model } from 'mongoose';
import {
  TInventory,
  TProduct,
  TVariant,
} from '../interfaces/product.interface';

const variantSchema = new Schema<TVariant>(
  {
    type: {
      type: String,
      required: [true, 'Product type is required.'],
      trim: true,
    },
    value: {
      type: String,
      required: [true, 'Product value is required.'],
      trim: true,
    },
  },
  { _id: false },
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required.'],
      trim: true,
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock is required.'],
      trim: true,
    },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product Price is required.'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'Product tags is required.'],
    trim: true,
  },
  variants: {
    type: [variantSchema],
    required: [true, 'Product variants is required.'],
    trim: true,
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory is required.'],
    trim: true,
  },
});

export const ProductModel = model('Product', productSchema);
