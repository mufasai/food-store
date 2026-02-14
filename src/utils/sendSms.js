import twilio from "twilio";

let client;

const getTwilioClient = () => {
    if (!client) {
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            throw new Error("Twilio credentials (SID or Auth Token) are missing in environment variables.");
        }
        client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }
    return client;
};

export const sendSms = async (to, message) => {
    const twilioClient = getTwilioClient();
    const from = process.env.TWILIO_PHONE_NUMBER;

    const payload = {
        body: message,
        to,
    };

    // Jika yang dimasukkan adalah Messaging Service SID (diawali 'MG')
    if (from.startsWith('MG')) {
        payload.messagingServiceSid = from;
    } else {
        payload.from = from;
    }

    return twilioClient.messages.create(payload);
};
