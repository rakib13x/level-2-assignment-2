import { TProduct } from "../interfaces/product.interface";
import { ProductModel } from "../model/product.model";
const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

export const ProductServices = {
  createProductIntoDb,
};
