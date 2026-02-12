import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import connectDB from "./config/db.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Food Store API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use(errorHandler);


export default app;