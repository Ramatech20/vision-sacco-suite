// src/controllers/accountController.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Account } from "../entities/Account";
import { Member } from "../entities/Member";

export const openAccount = async (req: Request, res: Response) => {
  try {
    const { memberId, type } = req.body;

    const memberRepo = getRepository(Member);
    const member = await memberRepo.findOne({ where: { id: memberId } });
    if (!member) return res.status(404).json({ error: "Member not found" });

    const accountRepo = getRepository(Account);
    const account = accountRepo.create({ member, type });
    await accountRepo.save(account);

    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: "Failed to open account" });
  }
};

export const listAccounts = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Account);
    const accounts = await repo.find({ relations: ["member"] });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
  // src/controllers/accountController.ts
import { logAction } from "../utils/auditLogger";

// inside openAccount
await accountRepo.save(account);

// log who opened the account
await logAction(req.user.id, "OPEN_ACCOUNT", `Account ${account.id} opened for Member ${member.id}`);

};
