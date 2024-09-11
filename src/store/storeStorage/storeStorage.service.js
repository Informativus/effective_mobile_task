import {
  GET_STORES_IDS_WITH_NAME,
  CREATE_STORE,
  GET_STORE_INFO_BY_ID,
  IS_EXIST_STORE,
} from "../../config/sqlQuerys.constats.js";
import { Storage } from "../../storage/storage.js";
import { InternalServerError } from "../../errors/InternalServier.error.js";

export class StoreStorage {
  constructor() {
    this.storage = Storage.getInstance();
  }

  async getStoresIdsWithName() {
    try {
      const result = await this.storage.sendQuery(GET_STORES_IDS_WITH_NAME);
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error getting store id");
    }
  }

  async getStoreInfoById(id) {
    try {
      const result = await this.storage.sendQuery(GET_STORE_INFO_BY_ID, [id]);
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error getting store id");
    }
  }

  async createStore(storeData) {
    try {
      await this.storage.sendQuery(CREATE_STORE, [storeData.name]);
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error creating store");
    }
  }

  async isExistStore(name) {
    try {
      const result = await this.storage.sendQuery(IS_EXIST_STORE, [name]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error checking store on existing");
    }
  }
}
