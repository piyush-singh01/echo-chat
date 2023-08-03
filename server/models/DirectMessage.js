import mongoose from "mongoose";

const directMessageSchema = new mongoose.Schema({
    // shouldn't be only sender and receiver for dm?
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      to: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      type: {
        type: String,
        enum: ["text", "media", "document", "link"],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },

      text: {
        type: String,
      },
      file: {
        type: String, //url of aws
      },
    },
  ],
});

const DirectMessage = new mongoose.model("DirectMessage", directMessageSchema);
export default DirectMessage;
