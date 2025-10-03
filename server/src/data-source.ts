import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { Member } from "./entities/Member";
import { Account } from "./entities/Account";
import { Transaction } from "./entities/Transaction";
import { User } from "./entities/User";
import { AuditLog } from "./entities/AuditLog";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "vision_sacco",
  synchronize: true, // set to false in production
  logging: false,
  entities: [Member, Account, Transaction, User, AuditLog],
  migrations: ["../db/migrations/*.sql"],
});
