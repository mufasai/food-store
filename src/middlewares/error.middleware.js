import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Zod validation error
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: err.errors.map(e => ({
                field: e.path.join("."),
                message: e.message
            }))
        });
    }

    // Mongoose invalid ID error
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
    }

    // Default server error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;
