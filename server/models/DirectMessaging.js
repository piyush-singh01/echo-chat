import mongoose from "mongoose";

const directMessagingSchema = new mongoose.Schema(
  {
    participants: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
      require: [true, "participants can not be null in one to one messaging"],
      validate: {
        validator: function (participants) {
          return participants.length == 2;
        },
        message: "one to one chat room should have exactly two participants",
      },
    },
  },
  {
    timestamps: true,
  }
);

const DirectMessaging = new mongoose.model("DirectMessaging", directMessagingSchema);

export default DirectMessaging;
