import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;
}
