import { Request, Response } from "express";
import { InvoiceService } from "../services/invoice.service";

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await InvoiceService.getAllInvoices();
    return res.json(invoices);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching invoices" });
  }
};

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceService.getInvoiceById(id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    return res.json(invoice);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching invoice" });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { clientId, productIds } = req.body;
    const invoice = await InvoiceService.createInvoice(clientId, productIds);
    return res.status(201).json(invoice);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating invoice",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getInvoicesByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const invoices = await InvoiceService.getInvoicesByClient(clientId);
    if (!invoices || invoices.length === 0) {
      return res
        .status(404)
        .json({ message: "No invoices found for this client" });
    }
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching invoices for client",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
