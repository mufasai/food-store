import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(3, "Name must be at least 3 characters"),

    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format")
});

export const updateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional()
});
