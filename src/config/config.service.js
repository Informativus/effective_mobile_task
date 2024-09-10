import { config } from "dotenv";

export class ConfigService {
  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error(error.message);
    }
    if (!parsed) {
      throw new Error("Failed to parse .env file");
    }
    this.config = parsed;
  }

  get(key) {
    const value = this.config[key];

    if (value) {
      return value;
    } else {
      throw new Error(`Environment variable ${key} is not set`);
    }
  }
}
