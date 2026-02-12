import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import connectDB from "./config/db.js";


dotenv.config();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Food Store API is running");
});

// Cache product and user routes at the edge for 1 minute
app.use("/api/users", (req, res, next) => {
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
    next();
}, userRoutes);

app.use("/api/products", (req, res, next) => {
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
    next();
}, productRoutes);
app.use(errorHandler);


export default app;