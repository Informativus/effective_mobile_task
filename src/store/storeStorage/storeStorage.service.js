import {
  CREATE_STORE,
  GET_STORE_ID_BY_NAME,
} from "../../config/sqlQuerys.constats.js";
import { Storage } from "../../storage/storage.js";

export class StoreStorage {
  constructor() {
    this.storage = Storage.getInstance();
  }

  async getStoreIdByName(name) {
    try {
      const result = await this.storage.sendQuery(GET_STORE_ID_BY_NAME, [name]);
      return result.id;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting store id");
    }
  }

  async createStore(name) {
    try {
      await this.storage.sendQuery(CREATE_STORE, [name]);
    } catch (error) {
      console.log(error);
      throw new Error("Error creating store");
    }
  }
}
