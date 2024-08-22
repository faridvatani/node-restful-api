import { createHmac, pbkdf2, randomBytes } from "crypto";
import { Response } from "express";
import { IUser } from "models/user.model";

export const sendResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data).end();
};

export const random = (length: number = 128): string => {
  return randomBytes(length).toString("base64");
};

export const hashPassword = (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 10000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
};

export const comparePassword = (
  password: string,
  hash: string,
  salt: string,
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await hashPassword(password, salt);
      resolve(hashedPassword === hash);
    } catch (err) {
      reject(err);
    }
  });
};

export const generateSessionToken = (user: IUser) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  const token = createHmac("sha256", secretKey)
    .update(JSON.stringify(payload))
    .digest("hex");

  return token;
};
