import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
