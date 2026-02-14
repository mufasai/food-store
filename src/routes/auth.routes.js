import express from "express";
import { register, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

// Route untuk register → kirim OTP
router.post("/register", register);

// Route untuk verifikasi OTP
router.post("/verify-otp", verifyOtp);

export default router;
