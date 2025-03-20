// src/services/invoice.service.ts
import { In } from "typeorm";
import { Invoice } from "../entities/Invoice";
import { Client } from "../entities/Client";
import { Product } from "../entities/Product";
import { AppDataSource } from "../config/dataSource";
import { DianClient } from "../clients/dian.client";

export class InvoiceService {
  static async getAllInvoices(): Promise<Invoice[]> {
    return await Invoice.find({ relations: ["clients", "products"] });
  }

  static async getInvoiceById(id: string): Promise<Invoice> {
    const invoice = await Invoice.findOne({
      where: { id },
      relations: ["clients", "products"],
    });
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  }

  static async createInvoice(
    clientId: string,
    productIds: string[]
  ): Promise<Invoice> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const client = await queryRunner.manager.findOne(Client, {
        where: { id: clientId },
      });
      if (!client) {
        throw new Error("Client not found");
      }

      const products = await queryRunner.manager.find(Product, {
        where: { id: In(productIds) },
      });
      if (products.length === 0) {
        throw new Error("No products found");
      }

      const invoice = new Invoice();
      Object.assign(invoice);
      invoice.client = client;
      invoice.products = products;
      invoice.total = products.reduce(
        (sum, product) => sum + Number(product.price),
        0
      );

      const savedInvoice = await queryRunner.manager.save(invoice);

      try {
        const dianResponse = await DianClient.sendInvoice(savedInvoice);
        console.log("DIAN response:", dianResponse);
      } catch (error) {
        throw new Error(
          `DIAN service error: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }

      await queryRunner.commitTransaction();
      return savedInvoice;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  static async getInvoicesByClient(clientId: string): Promise<Invoice[]> {
    const invoices = await Invoice.find({
      where: { client: { id: clientId } },
      relations: ["client", "products"],
    });
    return invoices;
  }
}
