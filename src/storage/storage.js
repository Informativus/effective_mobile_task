import pg from "pg";
import { ConfigService } from "../config/config.service.js";

const { Pool } = pg;

export class Storage {
  constructor() {
    if (Storage.instance) {
      return Storage.instance;
    }

    this.config = new ConfigService();
    this.pool = new Pool({
      user: this.config.get("PSQL_USER"),
      host: this.config.get("PSQL_HOST"),
      database: this.config.get("PSQL_DATABASE"),
      password: this.config.get("PSQL_PASSWORD"),
      port: this.config.get("PSQL_PORT"),
    });

    Storage.instance = this;
  }

  async sendQuery(query, values) {
    try {
      console.log(this.interpolateQuery(query, values));
      const response = await this.pool.query(query, values);
      return response.rows;
    } catch (error) {
      throw new Error("Error in query: " + error);
    }
  }

  interpolateQuery(text, values) {
    let index = 0;
    return text.replace(/\$[0-9]+/g, () => {
      const value = values[index++];
      return value;
    });
  }

  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
}
