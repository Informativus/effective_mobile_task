import { Router } from "express";
import { StoreService } from "./store.service.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { checkStoreId } from "./middlewares/checkStoreId.middleware.js";

export class StoreController {
  constructor() {
    this.router = Router();
    this.storeService = new StoreService();

    this.router.get("/stores", this.getStoresIdsWithName.bind(this));
    this.router.get(
      "/stores_info/:id",
      checkStoreId,
      this.getStoreInfoById.bind(this),
    );
    this.router.post("/create_store", this.createStore.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async getStoresIdsWithName(req, res) {
    try {
      const stores = await this.storeService.getStoresIdsWithName();

      if (stores.length === 0) {
        res.status(204).end();
        return;
      }

      res.status(200).json(stores);
    } catch (error) {
      new ErrorHandler().handle(error, "Error getting stores", res);
    }
  }

  async getStoreInfoById(req, res) {
    try {
      const { id } = req.params;

      const storeInfo = await this.storeService.getStoreInfoById(id);
      res.status(200).json(storeInfo);
    } catch (error) {
      new ErrorHandler().handle(error, "Error getting store info", res);
    }
  }

  async createStore(req, res) {
    try {
      const { storeData } = req.body;
      await this.storeService.createStore(storeData);
      res.status(201).end();
    } catch (error) {
      new ErrorHandler().handle(error, "Error creating store", res);
    }
  }
}
