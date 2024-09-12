import {
  CREAT_LEFTOVERS,
  GET_LEFTOVERS_BY_PLU,
  GET_LEFTOVERS_BY_PLU_AND_LEFTOVERS_AMOUNT,
  GET_LEFTOVERS_BY_STORE_ID,
  INCREASE_LEFTOVERS_BY_PLU_AND_STORE,
  REDUCE_LEFTOVERS_BY_PLU_AND_STORE,
} from "../../config/sqlQuerys.constats.js";
import { InternalServerError } from "../../errors/InternalServier.error.js";
import { Storage } from "../../storage/storage.js";

export class LeftoverStorage {
  constructor() {
    this.storage = Storage.getInstance();
  }

  async getLeftoversByStoreId(storeId) {
    try {
      const leftovers = await this.storage.sendQuery(
        GET_LEFTOVERS_BY_STORE_ID,
        [storeId],
      );
      return leftovers;
    } catch (error) {
      console.error(`Error getting leftovers store id: `, error);
      throw new InternalServerError("Error getting leftovers by store id");
    }
  }

  async getLeftoversByPlu(plu) {
    try {
      const leftovers = await this.storage.sendQuery(GET_LEFTOVERS_BY_PLU, [
        plu,
      ]);
      return leftovers;
    } catch (error) {
      console.error(`Error getting leftovers by plu: `, error);
      throw new InternalServerError("Error getting leftovers by plu");
    }
  }
  // TODO: Подумать над изменением названия функции
  async getLeftoversByPluAndLeftoversAmount(plu, amount) {
    try {
      const leftovers = await this.storage.sendQuery(
        GET_LEFTOVERS_BY_PLU_AND_LEFTOVERS_AMOUNT,
        [plu, amount],
      );
      return leftovers;
    } catch (error) {
      console.error(`Error getting leftovers by plu and amount: `, error);
      throw new InternalServerError(
        "Error getting leftovers by plu and amount",
      );
    }
  }

  async reduceLeftoversByPluAndStore(leftoversData) {
    try {
      await this.storage.sendQuery(REDUCE_LEFTOVERS_BY_PLU_AND_STORE, [
        leftoversData.amount,
        leftoversData.plu,
        leftoversData.storeId,
      ]);
    } catch (error) {
      console.error(`Error reducing leftovers: `, error);
      throw new InternalServerError("Error reducing leftovers");
    }
  }

  async increaseLeftoversByPluAndStore(leftoversData) {
    try {
      await this.storage.sendQuery(INCREASE_LEFTOVERS_BY_PLU_AND_STORE, [
        leftoversData.amount,
        leftoversData.plu,
        leftoversData.storeId,
      ]);
    } catch (error) {
      console.error(`Error increasing leftovers: `, error);
      throw new InternalServerError("Error increasing leftovers");
    }
  }

  async createLeftover(leftoversData) {
    try {
      await this.storage.sendQuery(CREAT_LEFTOVERS, [
        leftoversData.plu,
        leftoversData.storeId,
        leftoversData.amount,
      ]);
    } catch (error) {
      console.error(`Error creating leftover: `, error);
      throw new InternalServerError("Error creating leftover");
    }
  }
}
