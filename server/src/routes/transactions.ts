import { Router } from "express";
import { createTransaction, listTransactions } from "../controllers/transactionController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/:accountId", authMiddleware, listTransactions);

export default router;
