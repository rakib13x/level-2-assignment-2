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

const searchProductFromDb = async (regex: RegExp) => {
  const result = await ProductModel.find({
    name: { $regex: regex },
  });
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductInDb,
  deleteProductFromDb,
  searchProductFromDb,
};
