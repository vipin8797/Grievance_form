import mongoose from "mongoose";

const dbURL = process.env.Mongo_URL;

if (!dbURL) {
  console.log("MONGO_URL is missing in environment variables");
}

const connect = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB connected..");
  } catch (err) {
    console.error("DB connection failed");
    console.error(err.message);
    process.exit(1); // app crash — silent fail nahi
  }
};

export default connect;