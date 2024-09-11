export class InternalServerError extends Error {
  constructor(message = "Internal server error") {
    super(message);
    this.statusCode = 500;
    this.name = "InternalServerError";
  }
}
