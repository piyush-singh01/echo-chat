import app from "./app.js";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import User from "./models/Users.js";
import FriendRequest from "./models/friendRequest.js";
import DirectMessage from "./models/DirectMessage.js";
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
    await User.findByIdAndUpdate(user_id, { socket_id, status: "online" });
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

  // ? do we really need a socket event to send the dm chats?, can we not fetch them with a get method? which is better?
  socket.on("get_direct_conversation", async ({ user_ud }, callback) => {
    const exisiting_conversation = await DirectMessage.find({
      participants: { $all: [user_id] }, // all doc objects in which i am a participant
    }).populate("participants", "_id firstName lastName email status");

    console.log(exisiting_conversation);
    callback(exisiting_conversation);
  });

  //* To handle text and link messages,
  socket.on("text_message", async (data) => {
    console.log("Recieved message", data);
    // data: {to, from , text}; // send data in this way from the client side
    // create a new conversation if it doesn't exists
    // save to db
    // emit 'incoming_message' -> to the sender of the text message
    // emit 'outgoing_message' -> to the reciever of the text message
  });

  socket.on("file_message", async (data) => {
    console.log("Recieved message", data);
    // data: {to, from, text, file}
    // get the file extension
    const fileExtension = path.extname(data.file.name);
    //generate an arbitrary file name
    const fileName = `${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}${fileExtension}`;
    //upload this file to aws s3

    // create a new conversation if it doesn't exists
    // save to db
    // emit 'incoming_message' -> to the sender of the text message
    // emit 'outgoing_message' -> to the reciever of the text message
  });

  // initiate from the client side to end the connection. //? 'disconnect' won't work?
  socket.on("end", async (data) => {
    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "offline" });
    }

    // TODO: braodcast to all that this user has disconnected
    console.log("Closing connection");
    socket.disconnect(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close();
});
