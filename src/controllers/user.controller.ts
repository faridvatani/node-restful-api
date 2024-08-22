import { Request, Response, NextFunction } from "express";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
} from "../services/user.service";
import { hashPassword, random, sendResponse } from "../helpers";

export const getUsersController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getUsers();
    sendResponse(res, 200, users);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    return sendResponse(res, 200, user);
  } catch (error) {
    return next(error);
  }
};

export const createUserController = async (
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

    const exsitingUser = await getUserByEmail(email);

    if (exsitingUser) {
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

    return sendResponse(res, 201, { user, message: "User created" });
  } catch (error) {
    return next(error);
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    return sendResponse(res, 200, user);
  } catch (error) {
    return next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    return sendResponse(res, 200, { user, message: "User updated" });
  } catch (error) {
    return next(error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    return sendResponse(res, 204, { message: "User deleted" });
  } catch (error) {
    return next(error);
  }
};
