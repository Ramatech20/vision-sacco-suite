// src/controllers/transactionController.ts
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";

export const createTransaction = async (req: Request, res: Response) => {
  const { accountId, amount, type, description } = req.body;

  if (!["credit", "debit"].includes(type)) {
    return res.status(400).json({ error: "Invalid transaction type" });
  }

  try {
    await getManager().transaction(async (transactionalEntityManager) => {
      const accountRepo = transactionalEntityManager.getRepository(Account);
      const txnRepo = transactionalEntityManager.getRepository(Transaction);

      const account = await accountRepo.findOne({ where: { id: accountId }, relations: ["transactions"] });
      if (!account) throw new Error("Account not found");

      if (type === "debit" && account.balance < amount) {
        throw new Error("Insufficient funds");
      }

      // update balance
      account.balance = type === "credit"
        ? Number(account.balance) + Number(amount)
        : Number(account.balance) - Number(amount);

      await accountRepo.save(account);

      // record transaction
      const txn = txnRepo.create({
        account,
        amount,
        type,
        description,
      });
      await txnRepo.save(txn);

      res.status(201).json({ account, txn });
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Transaction failed" });
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;
    const txnRepo = getManager().getRepository(Transaction);
    const txns = await txnRepo.find({ where: { account: { id: accountId } }, relations: ["account"] });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
  // src/controllers/transactionController.ts
import { logAction } from "../utils/auditLogger";

// inside createTransaction, after txn is saved
await logAction(
  req.user.id,
  type === "credit" ? "DEPOSIT" : "WITHDRAWAL",
  `${type} of ${amount} on Account ${account.id}`
);
};
