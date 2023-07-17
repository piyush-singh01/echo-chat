import express from "express";
import morgan from "morgan"; //Request Logger
import rateLimit from "express-rate-limit";
import helmet from "helmet"; //http headers
import expressMongoSanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
import xss from "xss";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// log only if in production mode.
if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // 3000 requests in 1 hour max
  message: "Too many requests. Please try again later",
});

app.use("/echo", limiter); // for any path starting with tawk, this middleware will be implemented.
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // allow requests from anywhere
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], // allow only these requests.
    credentials: true, //sends cookie info and such in case of cross origin requests
  })
); // to allow cross origin resource sharing

app.use(expressMongoSanitize());
app.use(xss);

app.use(routes);

export default app;
