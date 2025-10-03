import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Account, account => account.transactions)
  account!: Account;

  @Column("decimal", { precision: 14, scale: 2 })
  amount!: number;

  @Column()
  type!: "credit" | "debit";

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
