import * as productService from "../services/product.service.js";
import { createProductSchema } from "../validations/product.validation.js";

export const createProduct = async (req, res, next) => {
    try {
        const validatedData = createProductSchema.parse(req.body);

        const product = await productService.createProductService(validatedData);

        res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};


export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProductsService();
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductByIdService(req.params.id);
        res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProductService(
            req.params.id,
            req.body
        );
        res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProductService(req.params.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (err) {
        next(err);
    }
};
