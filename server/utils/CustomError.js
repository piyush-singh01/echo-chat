export default class CustomError extends Error {
  constructor(message, statusCode, exception) {
    super(message);
    this.name = this.constructor.name;
    this.status = "error";
    this.statusCode = statusCode;
    this.exception = exception;
    Error.captureStackTrace(this, this.constructor);
  }

  get status() {
    return this.status;
  }

  get message() {
    return this.message;
  }

  get statusCode() {
    return this.statusCode;
  }

  get exception() {
    return this.exception;
  }
}
