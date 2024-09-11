import { Router } from "express";
import { ProductService } from "./product.service.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { checkShopId } from "./middlewares/checkShopId.middleware.js";
import { checkPlu } from "./middlewares/checkPlu.middleware.js";
import { checkProductData } from "./middlewares/checkProductData.middleware.js";

export class ProductController {
  constructor() {
    this.router = Router();
    this.productService = new ProductService();

    this.router.get("/products", this.getProductsPlusWithName.bind(this));
    this.router.get(
      "/products_shop/:shopId",
      checkShopId,
      this.getProductsPluWithShop.bind(this),
    );
    this.router.get("/product/:plu", checkPlu, this.getProductInfo.bind(this));
    this.router.post(
      "/create_product",
      checkProductData,
      this.createProduct.bind(this),
    );
  }

  getRouter() {
    return this.router;
  }

  async getProductsPlusWithName(req, res) {
    try {
      const products = await this.productService.getProductsPlusWithName();

      if (products.length === 0) {
        res.status(204).end();
        return;
      }

      res.status(200).json(products);
    } catch (error) {
      new ErrorHandler().handle(error, "Error getting products", res);
    }
  }

  async getProductsPluWithShop(req, res) {
    try {
      const { shopId } = req.params;

      const products = await this.productService.getProductsPluWithShop(shopId);

      if (products.length === 0) {
        res.status(204).end();
        return;
      }

      res.status(200).json(products);
    } catch (error) {
      new ErrorHandler().handle(
        error,
        "Error getting products with shop id",
        res,
      );
    }
  }

  async getProductInfo(req, res) {
    try {
      const { plu } = req.params;

      const product = await this.productService.getProductInfo(plu);
      res.status(200).json(product);
    } catch (error) {
      new ErrorHandler().handle(error, "Error getting product info", res);
    }
  }

  async createProduct(req, res) {
    try {
      const { productData } = req.body;

      await this.productService.createProduct(productData);
      res.status(201).end();
    } catch (error) {
      new ErrorHandler().handle(error, "Error creating product", res);
    }
  }
}
