import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Account } from "../entities/Account";

export async function transferController(req: Request, res: Response, next: NextFunction) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    if (fromAccountId === toAccountId) {
      return res.status(400).json({ success: false, error: "Cannot transfer to the same account." });
    }
    const accountRepo = getRepository(Account);
    const fromAccount = await accountRepo.findOne(fromAccountId);
    const toAccount = await accountRepo.findOne(toAccountId);
    if (!fromAccount || !toAccount) {
      return res.status(404).json({ success: false, error: "Account not found." });
    }
    if (fromAccount.balance < amount) {
      return res.status(400).json({ success: false, error: "Insufficient funds." });
    }
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    await accountRepo.save([fromAccount, toAccount]);
    return res.json({ success: true, message: "Transfer successful." });
  } catch (err) {
    next(err);
  }
}
