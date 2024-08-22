import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller";
import isAuthenticated, { isOwner } from "../middleware";

const router = Router();

router.get("/", isAuthenticated, getAllUsersController);
router.get("/:id", isAuthenticated, getUserByIdController);
router.post("/", isAuthenticated, createUserController);
router.put("/:id", isAuthenticated, isOwner, updateUserController);
router.delete("/:id", isAuthenticated, isOwner, deleteUserController);

export default router;
