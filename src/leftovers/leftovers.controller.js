import { Router } from "express";
import { checkAmount } from "../middlewares/leftovers/checkAmount.middleware.js";
import { checkAmountOnValid } from "../middlewares/leftovers/checkAmountOnValid.middleware.js";
import { checkLeftoversDataOnType } from "../middlewares/leftovers/checkLeftoversDataTypes.middleware.js";
import { checkLeftoversDataOnUnique } from "../middlewares/leftovers/checkLeftoversDataOnUnique.middleware.js";
import { checkPlu } from "../middlewares/product/checkPlu.middleware.js";
import { checkStoreId } from "../middlewares/store/checkStoreId.middleware.js";
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
    this.router.patch(
      "/reduce_leftovers",
      checkLeftoversDataOnType,
      checkAmountOnValid,
      this.reduceLeftoversByPluAndStore.bind(this),
    );
    this.router.patch(
      "/increase_leftovers",
      checkLeftoversDataOnType,
      this.increaseLeftoversByPluAndStore.bind(this),
    );
    this.router.post(
      "/create_leftover",
      checkLeftoversDataOnType,
      checkLeftoversDataOnUnique,
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

  async reduceLeftoversByPluAndStore(req, res) {
    try {
      const { leftoversData } = req.body;

      await this.leftoversService.reduceLeftoversByPluAndStore(leftoversData);
      res.status(200).json({ message: "Leftover reduced" });
    } catch (error) {
      console.error(`Error reducing leftovers: `, error);
      new ErrorHandler().handle(error, "Error reducing leftovers", res);
    }
  }

  async increaseLeftoversByPluAndStore(req, res) {
    try {
      const { leftoversData } = req.body;

      await this.leftoversService.increaseLeftoversByPluAndStore(leftoversData);
      res.status(200).json({ message: "Leftover increased" });
    } catch (error) {
      console.error(`Error increasing leftovers: `, error);
      new ErrorHandler().handle(error, "Error increasing leftovers", res);
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
