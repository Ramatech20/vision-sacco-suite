import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { logAction } from "../utils/auditLogger";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const repo = getRepository(User);
    const existing = await repo.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = repo.create({ email, passwordHash: hashed, role: role || "member" });
    await repo.save(user);

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Registration error", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const repo = getRepository(User);
    const user = await repo.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const secret = process.env.JWT_SECRET || "";
    const token = (jwt as any).sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({ token });

    // audit log (best-effort)
    try {
      await logAction(user.id, "LOGIN", `User ${user.email} logged in`);
    } catch (e) {
      console.error("Audit log failed", e);
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

