import { Router } from "express";
import { me } from "../controllers/userController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, me);

export default router;
