/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from '../interfaces/product.interface';
import { ProductModel } from '../model/product.model';
const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDb = async (regex?: RegExp) => {
  try {
    const result = regex
      ? await ProductModel.find({ name: { $regex: regex } })
      : await ProductModel.find();

    return result;
  } catch (error: any) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

const getSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductInDb = async (id: string, updateData: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};
const deleteProductFromDb = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductInDb,
  deleteProductFromDb,
};
