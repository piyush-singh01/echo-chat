import app from "./app.js";
import mongoose from "mongoose";
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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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

io.on("connection", async (socket) => {
  console.log(socket.handshake);
  const user_id = socket.handshake.query("user_id");
  const socket_id = socket.id;
  console.log(`User ${user_id} connected to ${socket_id}`);
  if (user_id) {
    await User.findByIdAndUpdate(user_id, { socket_id });
  }
});

// Custom socket event listeners
io.on("friend_request", async (data) => {
  console.log(data.to);
  const to = await User.findById(data.to);
  // TODO: create a friend request
  io.to(to.socket_id).emit("new_friend_request", {});
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close();
});
