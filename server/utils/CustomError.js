export default class CustomError extends Error {
  constructor(message, statusCode, exception) {
    super(message);
    this._name = this.constructor.name;
    this._status = "error";
    this._statusCode = statusCode;
    this._exception = exception;
    this._message = message;
    Error.captureStackTrace(this, this.constructor);
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }

  get statusCode() {
    return this._statusCode;
  }

  get exception() {
    return this._exception;
  }
}