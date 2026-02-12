import Product from "../models/product.model.js";

export const createProduct = (data) => Product.create(data);

export const getAllProducts = () =>
    Product.find().populate("seller", "name email");

export const getProductById = (id) =>
    Product.findById(id).populate("seller", "name email");

export const updateProduct = (id, data) =>
    Product.findByIdAndUpdate(id, data, { new: true });

export const deleteProduct = (id) => Product.findByIdAndDelete(id);
