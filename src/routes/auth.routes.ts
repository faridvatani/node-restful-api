import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller";

const router = Router();

// POST /auth/register
router.post("/register", register);

// POST /auth/login
router.post("/login", login);

// POST /auth/logout
router.post("/logout", logout);

export default router;
