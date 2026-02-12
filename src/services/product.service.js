import * as productRepo from "../repositories/product.repository.js";

export const createProductService = async (data) => {
    return await productRepo.createProduct(data);
};

export const getAllProductsService = async () => {
    return await productRepo.getAllProducts();
};

export const getProductByIdService = async (id) => {
    const product = await productRepo.getProductById(id);
    if (!product) throw new Error("Product not found");
    return product;
};

export const updateProductService = async (id, data) => {
    const updated = await productRepo.updateProduct(id, data);
    if (!updated) throw new Error("Product not found");
    return updated;
};

export const deleteProductService = async (id) => {
    const deleted = await productRepo.deleteProduct(id);
    if (!deleted) throw new Error("Product not found");
    return deleted;
};
