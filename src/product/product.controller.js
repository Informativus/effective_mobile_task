import { Router } from "express";
import { ProductService } from "./product.service.js";

export class ProductController {
  constructor() {
    this.router = Router();
    this.productService = new ProductService();

    this.router.get("/products", this.getProducts.bind(this));
    this.router.get(
      "/products_shop/:shopId",
      this.getProductsWithShop.bind(this),
    );
    this.router.get("/product/:plu", this.getProduct.bind(this));
    this.router.post("/create_product", this.createProduct.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async getProducts(req, res) {
    try {
      const products = await this.productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(`Error getting products: ${error}`);
      res.status(500).json({ error: "Error getting products" });
    }
  }

  async getProductsWithShop(req, res) {
    try {
      const { shopId } = req.params;

      if (!shopId) {
        res.status(400).json({ error: "Shop ID is required" });
        return;
      }

      const products = await this.productService.getProductsWithShop(shopId);
      res.status(200).json(products);
    } catch (error) {
      console.log(`Error getting products with shop id: ${error}`);
      res.status(500).json({ error: "Error getting products with shop id" });
    }
  }

  async getProduct(req, res) {
    try {
      const { plu } = req.params;

      if (!plu) {
        res.status(400).json({ error: "PLU is required" });
        return;
      }

      const product = await this.productService.getProduct(plu);
      res.status(200).json(product);
    } catch (error) {
      console.log(`Error getting product: ${error}`);
      res.status(500).json({ error: "Error getting product" });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, price, shopId } = req.body;

      if (!name || !price || !shopId) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      const productData = { name, price, shopId };
      const product = await this.productService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      console.log(`Error creating product: ${error}`);
      res.status(500).json({ error: "Error creating product" });
    }
  }
}
