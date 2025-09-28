// src/routes/reports.ts
import { Router } from "express";
import { balanceSheet, cashFlow, memberStats } from "../controllers/reportController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.get("/balance-sheet", authMiddleware, balanceSheet);
router.get("/cashflow", authMiddleware, cashFlow);
router.get("/member-stats", authMiddleware, memberStats);

export default router;
