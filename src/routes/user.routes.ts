import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
} from "../controllers/user.controller";

const router = Router();

router.post("/users", createUserController);
router.get("/users/:id", getUserByIdController);

export default router;
