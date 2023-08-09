import mongoose from "mongoose";

const groupMessagesSchema = new mongoose.Schema(
  {
    group_id: {
      type: mongoose.Schema.ObjectId,
      ref: "GroupMessaging",
      require: [true, "group_id reference can not be empty"],
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
      ref: "User",
      index: true,
    },

    messageSentAt: {
      type: Date,
      require: [true, "message sent time can not be null"],
    },

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

const GroupMessages = new mongoose.model("GroupMessages", groupMessagesSchema);

export default GroupMessages;
