// src/entities/Transaction.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount: number;

  @Column()
  type: string; // debit | credit

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
