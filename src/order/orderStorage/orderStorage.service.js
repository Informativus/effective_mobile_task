import { Storage } from "../../storage/storage.js";
import { InternalServerError } from "../../errors/InternalServier.error.js";
import {
  CREATE_ORDER,
  GET_ALL_ORDERS,
} from "../../config/sqlQuerys.constats.js";

export class OrderStorage {
  constructor() {
    this.storage = Storage.getInstance();
  }

  async getOrders() {
    return await this.storage.sendQuery(GET_ALL_ORDERS, []);
  }

  async createOrder(orderData) {
    try {
      await this.storage.sendQuery(CREATE_ORDER, [
        orderData.plu,
        orderData.storeId,
        orderData.amount,
      ]);
    } catch (error) {
      console.error(`Error creating order: `, error);
      throw new InternalServerError("Error creating order");
    }
  }
}
