import express from "express";
import { register, login, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

// Route untuk register → kirim OTP
router.post("/register", register);
router.post("/login", login);

// Route untuk verifikasi OTP
router.post("/verify-otp", verifyOtp);

export default router;
