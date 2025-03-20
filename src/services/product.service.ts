import { Product } from "../entities/Product";

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    return await Product.find();
  }

  static async getProductById(id: string): Promise<Product | null> {
    return await Product.findOneBy({ id });
  }

  static async createProduct(name: string, price: number): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.price = price;
    await product.save();
    return product;
  }

  static async updateProduct(
    id: string,
    updateData: Partial<Product>
  ): Promise<Product | null> {
    const product = await Product.findOneBy({ id });
    if (!product) return null;

    Object.assign(product, updateData);
    return await product.save();
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const product = await Product.findOneBy({ id });
    if (!product) return false;

    await product.softRemove();
    return true;
  }
}
