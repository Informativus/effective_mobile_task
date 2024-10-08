import {
  CREATE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS_PLUS_WTIH_NAME,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_PLU_WITH_SHOP_ID,
} from "../../config/sqlQuerys.constats.js";
import { InternalServerError } from "../../errors/InternalServier.error.js";
import { Storage } from "../../storage/storage.js";

export class ProductStorageService {
  constructor() {
    this.storage = Storage.getInstance();
  }

  async getProductsPlusWithName() {
    try {
      const productsPlus = await this.storage.sendQuery(
        GET_PRODUCTS_PLUS_WTIH_NAME,
      );
      return productsPlus;
    } catch (error) {
      console.log(`Error getting products: `, error);
      throw new InternalServerError("Error getting products");
    }
  }

  async getProductInfoByName(name) {
    try {
      const product = await this.storage.sendQuery(GET_PRODUCT_BY_NAME, [name]);
      return product;
    } catch (error) {
      console.log(`Error getting products: `, error);
      throw new InternalServerError("Error getting product info");
    }
  }

  async getProductsPluByShopId(shopId) {
    try {
      const products = await this.storage.sendQuery(
        GET_PRODUCT_PLU_WITH_SHOP_ID,
        [shopId],
      );
      return products;
    } catch (error) {
      console.log(`Error getting products: `, error);
      throw new InternalServerError("Error getting products with shop id");
    }
  }

  async getProductInfo(plu) {
    try {
      const product = await this.storage.sendQuery(GET_PRODUCT, [plu]);
      return product;
    } catch (error) {
      console.log(`Error getting products: `, error);
      throw new InternalServerError("Error getting product info");
    }
  }

  async createProduct(productData) {
    try {
      const productPlu = await this.storage.sendQuery(CREATE_PRODUCT, [
        productData.plu,
        productData.name,
        productData.price,
      ]);

      if (productPlu.length === 0) {
        throw new InternalServerError("Error creating product");
      }

      return productPlu;
    } catch (error) {
      console.log(`Error creating product: `, error);
      throw new InternalServerError("Error creating product");
    }
  }
}
