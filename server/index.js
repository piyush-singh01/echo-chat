import app from "./app.js";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import User from "./models/Users.js";
import FriendRequest from "./models/friendRequest.js";

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
const DB_URI = process.env.MONGO_URI.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);
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
  });

// on a socket connection
io.on("connection", async (socket) => {
  const { user_id } = socket.handshake.query; // socket.handshake is an object that contain details about the handshake that happens at the beggining of the socket.io session. query is the query string. ...?user_id=123weq
  const socket_id = socket.id;

  console.log(`User ${user_id} connected to ${socket_id}`);
  if (Boolean(user_id)) {
    await User.findByIdAndUpdate(user_id, { socket_id });
  }

  //* THE FRIEND REQUEST EVENT
  // Custom socket event listeners the 'on' event here is initiated from the client side
  // socket is the connection b/w the server and that client. (unique for each ordered pair).
  socket.on("friend_request", async (data) => {
    console.log(data.to);
    const to = await User.findById(data.to).select("socket_id"); //socket id of receiver  output --> {socket_id: .}
    const from = await User.findById(data.from).select("socket_id"); //socket id of sender

    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });

    // io is the server side instance
    // emit an event new friend request
    io.to(to.socket_id).emit("new_friend_request", {
      message: "New Friend Request from ...",
    });

    io.to(from.socket_id).emit("request_sent", {
      message: "Friend Request Sent to ...",
    });
  });

  socket.on("accept_request", async (data) => {
    // data will come from client side and will contain request_id (_id of the entry in FriendRequest Schema);
    const request = await FriendRequest.findById(data.request_id);
    const sender = await User.findById(request.sender);
    const receiver = await User.findById(request.recipient);

    // push in each others friends array
    sender.friends.push(request.recipient);
    receiver.friends.push(request.sender);

    await sender.save({ new: true, validateModifiedOnly: true });
    await receiver.save({ new: true, validateModifiedOnly: true });

    // Only unacknowledged requests are in the FriendRequests.  //? should it not be better to mark them as acknowledged
    await FriendRequest.findByIdAndDelete(data.request_id);

    io.to(sender.socket_id).emit("request_accepted", {
      // ! Not needed i think? no need to acknowledge the client again?
      message: "Friend Request Accepted",
    });

    io.to(receiver.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });

  // initiate from the client side to end the connection. //? 'disconnect' won't work?
  socket.on('end', function() {
    console.log("Closing connection")
    socket.disconnect(0);
  })
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close();
});
