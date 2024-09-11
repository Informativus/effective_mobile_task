import { ProductStorage } from "./productStorage/productStorage.js";
import { generatePlu } from "../utils/generatePlu.util.js";
import { BadRequestError } from "../errors/BadRequest.error.js";

export class ProductService {
  constructor() {
    this.productStorage = new ProductStorage();
  }

  async getProductsPlusWithName() {
    const productsPlus = await this.productStorage.getProductsPlusWithName();

    if (productsPlus.length === 0) {
      return [];
    }

    return productsPlus;
  }

  async getProductsPluWithShop(shopId) {
    const productsPlus =
      await this.productStorage.getProductsPluByShopId(shopId);

    if (productsPlus.length === 0) {
      return [];
    }

    return productsPlus;
  }

  async getProductInfo(plu) {
    const productInfo = await this.productStorage.getProductInfo(plu);

    if (productInfo.length === 0) {
      throw new BadRequestError("Product does not exist");
    }

    return productInfo[0];
  }

  async createProduct(productData) {
    productData.plu = generatePlu();
    await this.productStorage.createProduct(productData);
  }
}
