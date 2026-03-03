import "dotenv/config";
import { sendSms } from "./src/utils/sendSms.js";

async function test() {
    console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
    try {
        const res = await sendSms("+628123456789", "Test OTP: 1234");
        console.log("Success:", res.sid);
    } catch (err) {
        console.error("Twilio Error Name:", err.name);
        console.error("Twilio Error Message:", err.message);
        if (err.code) console.error("Twilio Error Code:", err.code);
    }
}

test();
