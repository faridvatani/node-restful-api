import express, { Request, Response, NextFunction } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import router from "./routes";

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
connectToDatabase();

// Mount the router
app.use("/api", router);
