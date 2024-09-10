import { Storage } from "../storage/storage.js";
import { GET_PRODUCTS } from "../config/sqlQuerys.constats.js";

export class ProductService {
  constructor() {
    this.storage = Storage.getInstance();
  }

  async getProducts() {
    try {
      const products = await this.storage.sendQuery(GET_PRODUCTS);
      return products;
    } catch (error) {
      console.log(`Error getting products: ${error}`);
      throw new InternalServerError("Error getting products");
    }
  }

  async getProductsWithShop(shopId) {
    throw new Error("Method not implemented.");
  }

  async getProduct(plu) {
    throw new Error("Method not implemented.");
  }

  async createProduct(productData) {
    throw new Error("Method not implemented.");
  }
}
