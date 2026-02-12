import { z } from "zod";
import mongoose from "mongoose";

export const createProductSchema = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    description: z.string().optional(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().optional(),
    imageUrl: z.string().url().optional(),

    // Validasi ObjectId seller
    seller: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid seller ID",
    }),
});

export const updateProductSchema = z.object({
    name: z.string().min(3).optional(),
    price: z.number().positive().optional(),
    description: z.string().optional(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().optional(),
    imageUrl: z.string().url().optional(),
    seller: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid seller ID",
    }).optional(),
});
