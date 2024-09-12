import { Router } from "express";
import { checkLeftoversData } from "../middlewares/leftovers/checkLeftoversData.middleware.js";
import { checkPlu } from "../middlewares/product/checkPlu.middleware.js";
import { checkStoreId } from "../middlewares/store/checkStoreId.middleware.js";
import { checkAmount } from "../middlewares/leftovers/checkAmount.middleware.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { LeftoversService } from "./leftovers.service.js";

export class LeftoversController {
  constructor() {
    this.router = Router();
    this.leftoversService = new LeftoversService();

    this.router.get(
      "/leftovers_by_plu/:plu",
      checkPlu,
      this.getLeftoversByPlu.bind(this),
    );
    this.router.get(
      "/leftovers_by_store/:id",
      checkStoreId,
      this.getLeftoversByStoreId.bind(this),
    );
    this.router.get(
      "/leftovers_by_plu_and_amount/:plu/:amount",
      checkPlu,
      checkAmount,
      this.getLeftoversByPluAndLeftoversAmount.bind(this),
    );
    this.router.post(
      "/create_leftover",
      checkLeftoversData,
      this.createLeftover.bind(this),
    );
  }

  getRouter() {
    return this.router;
  }

  async getLeftoversByPlu(req, res) {
    try {
      const { plu } = req.params;

      const leftovers = await this.leftoversService.getLeftoversByPlu(plu);

      if (leftovers.length === 0) {
        res.status(204).end();
        return;
      }

      res.status(200).json(leftovers);
    } catch (error) {
      console.error(`Error getting leftovers by plu: `, error);
      new ErrorHandler().handle(error, "Error getting leftovers by plu", res);
    }
  }

  async getLeftoversByStoreId(req, res) {
    try {
      const { id } = req.params;

      const leftovers = await this.leftoversService.getLeftoversByStoreId(id);

      if (leftovers.length === 0) {
        res.status(204).end();
        return;
      }

      res.status(200).json(leftovers);
    } catch (error) {
      console.error(`Error getting leftovers by store id: `, error);
      new ErrorHandler().handle(
        error,
        "Error getting leftovers by store id",
        res,
      );
    }
  }

  async getLeftoversByPluAndLeftoversAmount(req, res) {
    try {
      const { plu, amount } = req.params;

      const leftovers =
        await this.leftoversService.getLeftoversByPluAndLeftoversAmount(
          plu,
          amount,
        );

      if (leftovers.length === 0) {
        res.status(204).end();
        return;
      }

      res.status(200).json(leftovers);
    } catch (error) {
      console.error(`Error getting leftovers by plu and amount: `, error);
      new ErrorHandler().handle(
        error,
        "Error getting leftovers by plu and amount",
        res,
      );
    }
  }

  async createLeftover(req, res) {
    try {
      const { leftoversData } = req.body;

      await this.leftoversService.createLeftover(leftoversData);
      res.status(201).json({ message: "Leftover created" });
    } catch (error) {
      console.error(`Error creating leftover: `, error);
      new ErrorHandler().handle(error, "Error creating leftovers", res);
    }
  }
}
