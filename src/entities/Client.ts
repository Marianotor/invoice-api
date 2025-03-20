import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Invoice } from "./Invoice";

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Invoice, (invoice) => invoice.client)
  invoices: Invoice[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updateAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
