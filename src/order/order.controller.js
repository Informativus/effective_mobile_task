import { Router } from "express";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { OrderService } from "./order.service.js";
import { checkOrderDataTypes } from "../middlewares/orders/checkOrderDataTypes.middleware.js";
import { checkAmountOnValid } from "../middlewares/orders/checkAmountOnValid.middleware.js";

export class OrderController {
  constructor() {
    this.router = Router();
    this.orderService = new OrderService();

    this.router.get("/orders", this.getOrders.bind(this));
    this.router.post(
      "/create_order",
      checkOrderDataTypes,
      checkAmountOnValid,
      this.createOrder.bind(this),
    );
  }

  getRouter() {
    return this.router;
  }

  async getOrders(req, res) {
    try {
      const orders = await this.orderService.getOrders();

      if (orders.length === 0) {
        res.status(204).end();
      }

      res.status(200).json(orders);
    } catch (error) {
      console.error(`Error getting orders: `, error);
      new ErrorHandler().handle(error, "Error getting orders", res);
    }
  }

  async createOrder(req, res) {
    try {
      const { orderData } = req.body;

      await this.orderService.createOrder(orderData);
      res.status(201).end();
    } catch (error) {
      console.error(`Error creating order: `, error);
      new ErrorHandler().handle(error, "Error creating order", res);
    }
  }
}
