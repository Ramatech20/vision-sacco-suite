// src/entities/AuditLog.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  action: string; // e.g. "CREATED_ACCOUNT", "DEPOSIT", "LOGIN"

  @Column({ nullable: true })
  details: string;

  @CreateDateColumn()
  timestamp: Date;
}
