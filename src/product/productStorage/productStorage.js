import {
  CREATE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_PLU_WITH_SHOP_ID,
} from "../../config/sqlQuerys.constats.js";
import { Storage } from "../../storage/storage.js";

export class ProductStorage {
  constructor() {
    this.storage = Storage.getInstance();
  }

  async getProducts() {
    try {
      const products = await this.storage.sendQuery(GET_PRODUCTS);
      return products;
    } catch (error) {
      console.log(`Error getting products: ${error}`);
      throw new Error("Error getting products");
    }
  }

  async getProductsPluWithShop(shopId) {
    try {
      const products = await this.storage.sendQuery(
        GET_PRODUCT_PLU_WITH_SHOP_ID,
        [shopId],
      );
      return products;
    } catch (error) {
      console.log(`Error getting products: ${error}`);
      throw new Error("Error getting products with shop id");
    }
  }

  async getProduct(plu) {
    try {
      const product = await this.storage.sendQuery(GET_PRODUCT, [plu]);
      return product;
    } catch (error) {
      console.log(`Error getting products: ${error}`);
      throw new Error("Error getting product");
    }
  }

  async createProduct(productData) {
    try {
      await this.storage.sendQuery(CREATE_PRODUCT, [
        productData.plu,
        productData.name,
        productData.price,
      ]);
    } catch (error) {
      console.log(`Error creating product: ${error}`);
      throw new Error("Error creating product");
    }
  }
}
