import { DianClient } from "../src/clients/dian.client";
import { AppDataSource } from "../src/config/dataSource";
import { Client } from "../src/entities/Client";
import { Invoice } from "../src/entities/Invoice";
import { Product } from "../src/entities/Product";
import { InvoiceService } from "../src/services/invoice.service";

jest.mock("../src/clients/dian.client", () => ({
  DianClient: {
    sendInvoice: jest.fn(),
  },
}));

describe("InvoiceService", () => {
  let mockQueryRunner: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        findOne: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
      },
    };

    jest
      .spyOn(AppDataSource, "createQueryRunner")
      .mockReturnValue(mockQueryRunner);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("createInvoice", () => {
    const clientId = "client-1";
    const productIds = ["prod-1", "prod-2"];
    const client = { id: clientId, name: "Test Client" } as Client;
    const products = [
      { id: "prod-1", price: 50 },
      { id: "prod-2", price: 100 },
    ] as Product[];
    const savedInvoice = {
      id: "inv-1",
      total: 150,
      client,
      products,
    } as Invoice;

    it("debe lanzar error si no se encuentra el cliente", async () => {
      mockQueryRunner.manager.findOne.mockResolvedValue(null);

      await expect(
        InvoiceService.createInvoice(clientId, productIds)
      ).rejects.toThrow("Client not found");

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it("debe lanzar error si no se encuentran productos", async () => {
      mockQueryRunner.manager.findOne.mockResolvedValue(client);
      mockQueryRunner.manager.find.mockResolvedValue([]);

      await expect(
        InvoiceService.createInvoice(clientId, productIds)
      ).rejects.toThrow("No products found");

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it("debe lanzar error si DianClient falla", async () => {
      mockQueryRunner.manager.findOne.mockResolvedValue(client);
      mockQueryRunner.manager.find.mockResolvedValue(products);
      mockQueryRunner.manager.save.mockResolvedValue(savedInvoice);

      (DianClient.sendInvoice as jest.Mock).mockRejectedValue(
        new Error("DIAN failure")
      );

      await expect(
        InvoiceService.createInvoice(clientId, productIds)
      ).rejects.toThrow("DIAN service error: DIAN failure");

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it("debe crear la factura exitosamente", async () => {
      mockQueryRunner.manager.findOne.mockResolvedValue(client);
      mockQueryRunner.manager.find.mockResolvedValue(products);
      mockQueryRunner.manager.save.mockResolvedValue(savedInvoice);
      (DianClient.sendInvoice as jest.Mock).mockResolvedValue({
        data: "success",
        invoiceId: savedInvoice.id,
      });

      const result = await InvoiceService.createInvoice(clientId, productIds);

      expect(result).toEqual(savedInvoice);
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });

  describe("getInvoiceById", () => {
    const invoiceId = "inv-1";
    const invoice = { id: invoiceId, total: 150 } as Invoice;

    it("debe retornar la factura si existe", async () => {
      jest.spyOn(Invoice, "findOne").mockResolvedValue(invoice);
      const result = await InvoiceService.getInvoiceById(invoiceId);
      expect(result).toEqual(invoice);
    });

    it("debe lanzar error si no se encuentra la factura", async () => {
      jest.spyOn(Invoice, "findOne").mockResolvedValue(null);
      await expect(InvoiceService.getInvoiceById(invoiceId)).rejects.toThrow(
        "Invoice not found"
      );
    });
  });

  describe("getInvoicesByClient", () => {
    const clientId = "client-1";
    const invoices = [{ id: "inv-1" }, { id: "inv-2" }] as Invoice[];

    it("debe retornar las facturas del cliente", async () => {
      jest.spyOn(Invoice, "find").mockResolvedValue(invoices);
      const result = await InvoiceService.getInvoicesByClient(clientId);
      expect(result).toEqual(invoices);
    });
  });

  describe("getAllInvoices", () => {
    const invoices = [{ id: "inv-1" }, { id: "inv-2" }] as Invoice[];

    it("debe retornar todas las facturas", async () => {
      jest.spyOn(Invoice, "find").mockResolvedValue(invoices);
      const result = await InvoiceService.getAllInvoices();
      expect(result).toEqual(invoices);
    });
  });
});
