import { Request, Response, NextFunction } from "express";
import {
  getUserByEmail,
  createUser,
  getUserBySessionToken,
} from "../services/user.service";
import {
  comparePassword,
  generateSessionToken,
  hashPassword,
  random,
  sendResponse,
} from "../helpers";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, {
        message: "Email and password are required",
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }

    const isPasswordValid = await comparePassword(
      password,
      user.authentication.password,
      user.authentication.salt,
    );

    if (!isPasswordValid) {
      return sendResponse(res, 401, { message: "Invalid credentials" });
    }

    const token = generateSessionToken(user);
    user.authentication.sessionToken = token;

    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return sendResponse(res, 200, {
      token,
      user: { email, userName: user.username },
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;

    if (!email || !password || !username) {
      return sendResponse(res, 400, {
        message: "Email, password and username are required",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return sendResponse(res, 400, { message: "User already exists" });
    }

    const salt = random();
    const hashedPassword = await hashPassword(password, salt);

    const user = await createUser({
      firstName,
      lastName,
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    return sendResponse(res, 201, { user, message: "User registered" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.body;

    if (!token) {
      return sendResponse(res, 400, { message: "Token is required" });
    }

    const user = await getUserBySessionToken(token);

    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }

    if (!user.authentication.sessionToken) {
      return sendResponse(res, 400, { message: "Invalid token" });
    }

    user.authentication.sessionToken = null;
    await user.save();

    res.clearCookie("token");

    return sendResponse(res, 200, { message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
