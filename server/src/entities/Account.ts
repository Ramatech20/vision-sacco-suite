// src/entities/Account.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Member } from "./Member";
import { Transaction } from "./Transaction";

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: string; // e.g. savings | loan

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => Member, (member) => member.accounts)
  member: Member;

  @OneToMany(() => Transaction, (txn) => txn.account)
  transactions: Transaction[];

  @CreateDateColumn()
  openedAt: Date;
}
