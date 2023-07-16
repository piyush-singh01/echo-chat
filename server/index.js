import app from "./app.js";
import mongoose from "mongoose";
import http from "http";
import "dotenv/config";

// graceful termination in case on any error
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const server = http.createServer(app);

const DB_URI = process.env.MONGO_URI.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is connected");
    server.listen(PORT, () => {
      console.log(`Server Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close();
});
