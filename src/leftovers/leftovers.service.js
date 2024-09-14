import { LeftoverStorage } from "./leftoversStorage/leftoversStorage.service.js";
import { ActionsService } from "../actions/actions.service.js";
import { ACTIONS_LIST } from "../config/global.constats.js";

export class LeftoversService {
  constructor() {
    this.leftoverStorage = new LeftoverStorage();
    this.actionsService = new ActionsService();
  }

  async getLeftoversByPlu(plu) {
    const leftovers = await this.leftoverStorage.getLeftoversByPlu(plu);

    if (leftovers.length === 0) {
      return [];
    }

    return leftovers;
  }

  async getLeftoversByStoreId(storeId) {
    const leftovers = await this.leftoverStorage.getLeftoversByStoreId(storeId);

    if (leftovers.length === 0) {
      return [];
    }

    return leftovers;
  }

  async getLeftoversByPluAndLeftoversAmount(plu, amount) {
    const leftovers =
      await this.leftoverStorage.getLeftoversByPluAndLeftoversAmount(
        plu,
        amount,
      );

    if (leftovers.length === 0) {
      return [];
    }

    return leftovers;
  }

  async reduceLeftoversByPluAndStore(leftoversData) {
    await this.actionsService.addAction({
      action: ACTIONS_LIST.reduceLeftover,
      plu: leftoversData.plu,
      storeId: leftoversData.storeId,
    });
    await this.leftoverStorage.reduceLeftoversByPluAndStore(leftoversData);
  }

  async increaseLeftoversByPluAndStore(leftoversData) {
    await this.actionsService.addAction({
      action: ACTIONS_LIST.increaseLeftover,
      plu: leftoversData.plu,
      storeId: leftoversData.storeId,
    });
    await this.leftoverStorage.increaseLeftoversByPluAndStore(leftoversData);
  }

  async createLeftover(leftoversData) {
    await this.leftoverStorage.createLeftover(leftoversData);
  }
}
