// src/controllers/memberController.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Member } from "../entities/Member";
import { logAction } from "../utils/auditLogger";

// Create Member
export const createMember = async (req: any, res: Response) => {
  try {
    const { firstName, lastName, nationalId, phone, email } = req.body;

    const repo = getRepository(Member);
    const existing = await repo.findOne({ where: [{ nationalId }, { phone }] });
    if (existing) return res.status(400).json({ error: "Member already exists" });

    const member = repo.create({ firstName, lastName, nationalId, phone, email });
    await repo.save(member);

    await logAction(req.user.id, "CREATE_MEMBER", `Member ${member.id} created`);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to create member" });
  }
};

// List Members (with pagination)
export const listMembers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const repo = getRepository(Member);

    const [data, total] = await repo.findAndCount({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      order: { joinedAt: "DESC" },
    });

    res.json({ total, page: Number(page), limit: Number(limit), data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

// Get Single Member
export const getMember = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Member);
    const member = await repo.findOne({ where: { id: req.params.id }, relations: ["accounts"] });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch member" });
  }
};

// Update Member
export const updateMember = async (req: any, res: Response) => {
  try {
    const repo = getRepository(Member);
    const member = await repo.findOne({ where: { id: req.params.id } });
    if (!member) return res.status(404).json({ error: "Member not found" });

    Object.assign(member, req.body);
    await repo.save(member);

    await logAction(req.user.id, "UPDATE_MEMBER", `Member ${member.id} updated`);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to update member" });
  }
};

// Delete Member
export const deleteMember = async (req: any, res: Response) => {
  try {
    const repo = getRepository(Member);
    const member = await repo.findOne({ where: { id: req.params.id } });
    if (!member) return res.status(404).json({ error: "Member not found" });

    await repo.remove(member);
    await logAction(req.user.id, "DELETE_MEMBER", `Member ${member.id} deleted`);

    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete member" });
  }
};
