// src/controllers/reportController.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";
import { Member } from "../entities/Member";

export const balanceSheet = async (req: any, res: Response) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const accountRepo = getRepository(Account);
    const accounts = await accountRepo.find();

    const totalAssets = accounts
      .filter((a) => a.type === "savings")
      .reduce((sum, acc) => sum + Number(acc.balance), 0);

    const totalLoans = accounts
      .filter((a) => a.type === "loan")
      .reduce((sum, acc) => sum + Number(acc.balance), 0);

    res.json({
      totalAssets,
      totalLoans,
      netPosition: totalAssets - totalLoans,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate balance sheet" });
  }
};

export const cashFlow = async (req: any, res: Response) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const txnRepo = getRepository(Transaction);
    const txns = await txnRepo.find();

    const totalCredits = txns
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalDebits = txns
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    res.json({
      inflow: totalCredits,
      outflow: totalDebits,
      netCash: totalCredits - totalDebits,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate cashflow report" });
  }
};

export const memberStats = async (req: any, res: Response) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const memberRepo = getRepository(Member);
    const accountRepo = getRepository(Account);

    const totalMembers = await memberRepo.count();
    const activeAccounts = await accountRepo.count();

    res.json({
      totalMembers,
      activeAccounts,
      avgAccountsPerMember: totalMembers ? activeAccounts / totalMembers : 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate member stats" });
  }
};
