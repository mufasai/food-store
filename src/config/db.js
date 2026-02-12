import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("MongoDB connected");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// };

// export default connectDB;

let cachedDb = null;

const connectDB = async () => {
    if (cachedDb) return cachedDb;

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        cachedDb = db;
        console.log("MongoDB connected");
        return cachedDb;
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export default connectDB;