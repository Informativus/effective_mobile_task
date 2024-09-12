import { OrderStorage } from "./orderStorage/orderStorage.service.js";
import { LeftoversService } from "../leftovers/leftovers.service.js";

export class OrderService {
  constructor() {
    this.orderStorage = new OrderStorage();
    this.leftoversService = new LeftoversService();
  }

  async getOrders() {
    const orders = await this.orderStorage.getOrders();

    if (orders.length === 0) {
      return [];
    }

    return orders;
  }

  async createOrder(orderData) {
    await this.leftoversService.reduceLeftoversByPluAndStore(orderData);
    await this.orderStorage.createOrder(orderData);
  }
}
