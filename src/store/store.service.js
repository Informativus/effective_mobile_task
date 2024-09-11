import { StoreStorage } from "./storeStorage/storeStorage.service.js";
import { BadRequestError } from "../errors/BadRequest.error.js";

export class StoreService {
  constructor() {
    this.storeStorage = new StoreStorage();
  }

  async getStoresIdsWithName() {
    const storesInfo = await this.storeStorage.getStoresIdsWithName();

    if (storesInfo.length === 0) {
      return [];
    }

    return storesInfo;
  }

  async getStoreInfoById(id) {
    const storeId = await this.storeStorage.getStoreInfoById(id);

    if (storeId.length === 0) {
      throw new BadRequestError("Store not found");
    }

    return storeId[0];
  }

  async createStore(storeData) {
    if (await this._isExistStore(storeData.name)) {
      throw new BadRequestError("Store already exist");
    }

    await this.storeStorage.createStore(storeData);
  }

  async _isExistStore(name) {
    const isExist = await this.storeStorage.isExistStore(name);
    return isExist[0].exists;
  }
}
