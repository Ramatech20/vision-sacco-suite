import { Router } from "express";
import { openAccount, listAccounts } from "../controllers/accountController";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.post("/", authMiddleware, openAccount);
router.get("/", authMiddleware, listAccounts);

export default router;
