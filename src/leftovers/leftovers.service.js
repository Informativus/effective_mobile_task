import { LeftoverStorage } from "./leftoversStorage/leftoversStorage.service.js";

export class LeftoversService {
  constructor() {
    this.leftoverStorage = new LeftoverStorage();
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
    await this.leftoverStorage.reduceLeftoversByPluAndStore(leftoversData);
  }

  async increaseLeftoversByPluAndStore(leftoversData) {
    await this.leftoverStorage.increaseLeftoversByPluAndStore(leftoversData);
  }

  async createLeftover(leftoversData) {
    await this.leftoverStorage.createLeftover(leftoversData);
  }
}
