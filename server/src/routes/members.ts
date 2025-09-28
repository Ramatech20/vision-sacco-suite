// src/routes/members.ts
import { Router } from "express";
import {
  createMember,
  listMembers,
  getMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createMember);
router.get("/", authMiddleware, listMembers);
router.get("/:id", authMiddleware, getMember);
router.put("/:id", authMiddleware, updateMember);
router.delete("/:id", authMiddleware, deleteMember);

export default router;
