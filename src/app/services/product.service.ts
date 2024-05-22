import { TProduct } from "../interfaces/product.interface";
import { ProductModel } from "../model/product.model";
const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
};
