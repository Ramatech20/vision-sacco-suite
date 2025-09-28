// src/entities/Member.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Member {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  nationalId: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Account, (account) => account.member)
  accounts: Account[];

  @CreateDateColumn()
  joinedAt: Date;
}
