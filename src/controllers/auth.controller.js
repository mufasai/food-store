import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendSms } from "../utils/sendSms.js";

export const register = async (req, res) => {
    try {
        const { username, phone, password } = req.body;

        let user = await User.findOne({ phone });

        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

        if (!user) {
            user = await User.create({
                username,
                phone,
                password,
                otp,
                otpExpires,
            });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
        }

        await sendSms(phone, `Kode OTP kamu adalah ${otp}`);

        res.json({ message: "OTP sent to your phone" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send OTP" });
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
