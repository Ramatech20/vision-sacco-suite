import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const me = async (req: Request, res: Response) => {
  const repo = getRepository(User);
  const user = await repo.findOne(req.user.id);
  res.json(user);
};
