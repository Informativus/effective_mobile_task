import { BadRequestError } from "../errors/BadRequest.error.js";
import { InternalServerError } from "../errors/InternalServier.error.js";

export class ErrorHandler {
  handle(error, message = "Error", res) {
    if (error instanceof BadRequestError) {
      this._returnError(error, res);
    } else if (error instanceof InternalServerError) {
      this._returnError(error, res);
    } else {
      console.error(message, error);
      res.status(500).json({ error: message });
    }
  }

  _returnError(error, res) {
    console.error("Error: ", error.message, error);
    res.status(error.statusCode).json({ error: error.message });
    return;
  }
}
