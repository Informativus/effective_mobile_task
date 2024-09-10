import { ProductStorage } from "./productStorage/productStorage.js";

export class ProductService {
  constructor() {
    this.productStorage = new ProductStorage();
  }

  async getProducts() {
    return await this.productStorage.getProducts();
  }

  async getProductsWithShop(shopId) {
    return await this.productStorage.getProductsWithShop(shopId);
  }

  async getProduct(plu) {
    return await this.productStorage.getProduct(plu);
  }

  async createProduct(productData) {
    await this.productStorage.createProduct(productData);
  }
}
