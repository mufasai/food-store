import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    identifier: z.string(), // bisa email atau username
    password: z.string(),
});