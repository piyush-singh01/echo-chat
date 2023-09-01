import mongoose from "mongoose";

const lastSeenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  lastSeen: { type: Date },
});

const lastSeen = new mongoose.model("lastSeen", lastSeenSchema);

export default lastSeen;
