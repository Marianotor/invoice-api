import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const product = await ProductService.createProduct(name, price);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await ProductService.updateProduct(id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ProductService.deleteProduct(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting product" });
  }
};
