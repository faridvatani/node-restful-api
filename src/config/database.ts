import mongoose from "mongoose";
import dotenv from "dotenv";
import { safeAssign } from "../utils/safeAssign";

dotenv.config();

const dbURI = process.env.MONGO_URL;

if (!dbURI) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}

mongoose.Promise = global.Promise;

export const connectToDatabase = async () => {
  await safeAssign(mongoose.connect(dbURI));
};

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});
