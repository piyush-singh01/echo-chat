import CustomError from "./CustomError.js";

const errorHandler = (err, _, res, __) => {
  if (err instanceof CustomError) {
    console.log("An exception occurred", err.exception);
    res.status(err.statusCode).json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default errorHandler;
