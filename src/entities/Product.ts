import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Invoice } from "./Invoice";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Invoice, (invoice) => invoice.products)
  invoices: Invoice[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updateAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
