import app from "./app.js";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import User from "./models/Users.js";

// graceful termination in case on any error
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Uncaught Exception, shutting down the server...");
  process.exit(1);
});

// Creating a server and integrating socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Extracting db_uri and port number from environment variables
const DB_URI = process.env.MONGO_URI.replace("<password>", process.env.MONGO_PASSWORD);
const PORT = process.env.PORT || 5000;

// connect db
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
    console.log("Error connecting to the database, shutting down the server...");
    process.exit(1);
  });


// SOCKET EVENTS
io.on("connection", async (socket) => {
  const { user_id } = socket.handshake.query;
  const socket_id = socket.id;
  console.log(`User ${user_id} connected using the socket ${socket_id}`);

  if (Boolean(user_id)) {
    await User.findByIdAndUpdate(user_id, { socket_id, status: "online" });
  }

  socket.on("disconnect", async () => {
    console.log(`User ${user_id} disconnected, and the socket ${socket_id} is rendered null`);
    await User.findByIdAndUpdate(user_id, { socket_id: null, status: "offline" });
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close();
});
