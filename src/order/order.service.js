import { OrderStorage } from "./orderStorage/orderStorage.service.js";

export class OrderService {
  constructor() {
    this.orderStorage = new OrderStorage();
  }

  async getOrders() {
    const orders = await this.orderStorage.getOrders();

    if (orders.length === 0) {
      return [];
    }

    return orders;
  }

  async createOrder(orderData) {
    await this.orderStorage.createOrder(orderData);
  }
}
