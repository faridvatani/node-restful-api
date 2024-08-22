import crypto from "crypto";
import { Response } from "express";

const secret = process.env.SECRET || "secret";

export const random = (length: number = 128): string => {
  return crypto.randomBytes(length).toString("base64");
};

export const authentication = (password: string, salt: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};

export const sendResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data);
};
