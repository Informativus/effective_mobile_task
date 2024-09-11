import { Router } from "express";
import { ProductService } from "./product.service.js";
import { checkShopId } from "./middlewares/checkShopId.middleware.js";
import { checkPlu } from "./middlewares/checkPlu.middleware.js";
import { checkProductData } from "./middlewares/checkProductData.middleware.js";

export class ProductController {
  constructor() {
    this.router = Router();
    this.productService = new ProductService();

    this.router.get("/products", this.getProducts.bind(this));
    this.router.get(
      "/products_shop/:shopId",
      checkShopId,
      this.getProductsPluWithShop.bind(this),
    );
    this.router.get("/product/:plu", checkPlu, this.getProduct.bind(this));
    this.router.post(
      "/create_product",
      checkProductData,
      this.createProduct.bind(this),
    );
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

  async getProductsPluWithShop(req, res) {
    try {
      const { shopId } = req.params;

      const products = await this.productService.getProductsPluWithShop(shopId);
      res.status(200).json(products);
    } catch (error) {
      console.log(`Error getting products with shop id: ${error}`);
      res.status(500).json({ error: "Error getting products with shop id" });
    }
  }

  async getProduct(req, res) {
    try {
      const { plu } = req.params;

      const product = await this.productService.getProduct(plu);
      res.status(200).json(product);
    } catch (error) {
      console.log(`Error getting product: ${error}`);
      res.status(500).json({ error: "Error getting product" });
    }
  }

  async createProduct(req, res) {
    try {
      const { productData } = req.body;

      await this.productService.createProduct(productData);
      res.status(201).end();
    } catch (error) {
      console.log(`Error creating product: ${error}`);
      res.status(500).json({ error: "Error creating product" });
    }
  }
}
