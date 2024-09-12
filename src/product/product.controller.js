import { Router } from "express";
import { ProductService } from "./product.service.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { checkStoreId } from "../middlewares/store/checkStoreId.middleware.js";
import { checkPlu } from "../middlewares/product/checkPlu.middleware.js";
import { checkProductData } from "../middlewares/product/checkProductData.middleware.js";

export class ProductController {
  constructor() {
    this.router = Router();
    this.productService = new ProductService();

    this.router.get("/products", this.getProductsPlusWithName.bind(this));
    this.router.get(
      "/product_name/:name",
      this.getProductInfoByName.bind(this),
    );
    this.router.get(
      "/products_store/:id",
      checkStoreId,
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

  async getProductInfoByName(req, res) {
    try {
      const { name } = req.params;

      const product = await this.productService.getProductInfoByName(name);
      res.status(200).json(product);
    } catch (error) {
      new ErrorHandler().handle(
        error,
        "Error getting product info by name",
        res,
      );
    }
  }

  async getProductsPluWithShop(req, res) {
    try {
      const { id } = req.params;

      const products = await this.productService.getProductsPluWithShop(id);

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

      const productPlu = await this.productService.createProduct(productData);
      res.status(201).json(productPlu);
    } catch (error) {
      new ErrorHandler().handle(error, "Error creating product", res);
    }
  }
}
