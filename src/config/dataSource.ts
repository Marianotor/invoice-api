import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "../config";
import { Client } from "../entities/Client";
import { Product } from "../entities/Product";
import { Invoice } from "../entities/Invoice";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  entities: [Client, Product, Invoice],
});
