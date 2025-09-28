import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { transferController } from "../controllers/transferController";

const router = Router();

// POST /transfer
router.post(
  "/",
  validateRequest(["fromAccountId", "toAccountId", "amount"]),
  transferController
);

export default router;
