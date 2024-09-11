import { ProductStorage } from "./productStorage/productStorage.js";
import { generatePlu } from "../utils/generatePlu.util.js";

export class ProductService {
  constructor() {
    this.productStorage = new ProductStorage();
  }

  async getProducts() {
    return await this.productStorage.getProducts();
  }

  async getProductsPluWithShop(shopId) {
    return await this.productStorage.getProductsPluWithShop(shopId);
  }

  async getProduct(plu) {
    return await this.productStorage.getProduct(plu);
  }

  async createProduct(productData) {
    productData.plu = generatePlu();
    await this.productStorage.createProduct(productData);
  }
}
