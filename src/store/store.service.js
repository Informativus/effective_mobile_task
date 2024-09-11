import { StoreStorage } from "./storeStorage/storeStorage.service.js";
export class StoreService {
  constructor() {
    this.storeStorage = new StoreStorage();
  }
  async createStore(name) {
    try {
      this.storeStorage.createStore(name);
    } catch (error) {
      console.log(error);
      throw new Error("Error creating store");
    }
  }
}
