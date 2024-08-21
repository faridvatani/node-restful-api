import express, { Request, Response, NextFunction } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Middleware setup
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Basic route for health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Connect to MongoDB
const dbURI = process.env.MONGO_URL;
if (!dbURI) {
  throw new Error("MONGO_URL is not defined in the environment variables");
}

mongoose.Promise = Promise;
mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});
