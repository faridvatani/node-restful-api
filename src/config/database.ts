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
  const [error] = await safeAssign(mongoose.connect(dbURI));

  if (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  } else {
    console.log("Connected to MongoDB");
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});
