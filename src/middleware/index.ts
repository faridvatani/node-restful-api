import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../helpers";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../services/user.service";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "user._id") as string | undefined;

    if (!currentUserId?.toString()) {
      return sendResponse(res, 403, { message: "Unauthorized" });
    }

    if (id !== currentUserId?.toString()) {
      return sendResponse(res, 403, {
        message: "Unauthorized, you are not the owner of this resource",
      });
    }

    return next();
  } catch (error) {
    console.error("Error checking if user is owner:", error);
    return sendResponse(res, 500, { message: "Internal server error" });
  }
};

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const sessionToken: string | null = req.cookies["token"] || null;

    if (!sessionToken) {
      return sendResponse(res, 401, { message: "Unauthorized" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return sendResponse(res, 403, { message: "Unauthorized" });
    }

    merge(req, { user: existingUser });
    return next();
  } catch (error) {
    return next(error);
  }
};

export default isAuthenticated;
