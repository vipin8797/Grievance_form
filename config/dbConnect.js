import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database.
 * Uses the MONGO_URL environment variable.
 * @returns {Promise<void>}
 */
const connectDb = async () => {
    const dbURL = process.env.MONGO_URL;

    if (!dbURL) {
        console.error("CRITICAL ERROR: MONGO_URL is missing in environment variables");
        process.exit(1);
    }

    try {
        await mongoose.connect(dbURL);
        console.log("Database connection established successfully.");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
};

export default connectDb;
