import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendSms } from "../utils/sendSms.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

export const register = async (req, res) => {
    try {
        const data = registerSchema.parse(req.body);

        const existingUser = await User.findOne({
            $or: [
                { email: data.email },
                { username: data.username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
        });

        res.json({ message: "Register success" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);

        const user = await User.findOne({
            $or: [
                { email: data.identifier },
                { username: data.identifier }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login success",
            token,
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        const user = await User.findOne({ phone });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpires < Date.now())
            return res.status(400).json({ message: "OTP expired" });

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.json({ message: "Phone number verified!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
