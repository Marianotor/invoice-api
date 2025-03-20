// src/entities/Invoice.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
} from "typeorm";
import { Client } from "./Client";
import { Product } from "./Product";

@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("decimal", { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Client, (client) => client.invoices, {
    nullable: false,
  })
  client: Client;

  @ManyToMany(() => Product, (product) => product.invoices)
  @JoinTable()
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
