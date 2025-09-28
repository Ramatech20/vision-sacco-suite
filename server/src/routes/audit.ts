// src/routes/audit.ts
import { Router } from "express";
import { getRepository } from "typeorm";
import { AuditLog } from "../entities/AuditLog";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.get("/", authMiddleware, async (req: any, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const repo = getRepository(AuditLog);
  const logs = await repo.find({ order: { timestamp: "DESC" }, take: 100 });
  res.json(logs);
});

export default router;
