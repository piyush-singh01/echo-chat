import mongoose from "mongoose";

const directMessageSchema = new mongoose.model(
  {
    room_id: {
      type: mongoose.Schema.ObjectId,
      ref: "DirectMessaging",
      require: [true, "room_id reference can not be empty"],
      index: true,
    },

    messageType: {
      type: String,
      require: [true, "message must have a type"],
      enum: ["text", "media", "link", "doc"],
      default: "text",
    },

    sender: {
      type: mongoose.Schema.ObjectId,
      require: [true, "sender can not be null"],
      index: true,
    },

    receiver: {
      type: mongoose.Schema.ObjectId,
      require: [true, "receiver can not be null"],
    },

    messageSentAt: {
      type: Date,
      require: [true, "message sent time can not be null"],
    },

    // the message itself
    data: {
      type: String,
    },

    file: {
      type: String, // aws url
    },
  },
  {
    timestamps: true,
  }
);

const DirectMessages = new mongoose.model(
  "DirectMessages",
  directMessageSchema
);

export default DirectMessages;
