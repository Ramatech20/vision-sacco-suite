// src/utils/auditLogger.ts
import { getRepository } from "typeorm";
import { AuditLog } from "../entities/AuditLog";

export const logAction = async (userId: string, action: string, details?: string) => {
  const repo = getRepository(AuditLog);

  const log = repo.create({
    userId,
    action,
    details: details || "",
  });

  await repo.save(log);
};
