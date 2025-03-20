import { Router } from "express";
import {
  createInvoice,
  getInvoice,
  getInvoices,
  getInvoicesByClient,
} from "../controllers/invoice.controller";
const router = Router();

router.get("/invoices", getInvoices);
router.get("/invoice/:id", getInvoice);
router.get("/invoice/client/:clientId", getInvoicesByClient);
router.post("/invoices", createInvoice);
export default router;
