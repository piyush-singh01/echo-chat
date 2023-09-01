import mongoose from "mongoose";

const groupMessagingSchema = new mongoose.Schema(
  {
    participants: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
      require: [true, "number of participants can not be null in group messaging"],
      validate: {
        validator: function (participants) {
          return participants.length <= 100;
        },
        message: "group chat should have no more than 100 participants",
      },
    },

    groupName: {
      type: String,
      require: [true, "Group name is required"],
      min: 2,
      max: 20,
    },

    groupDescription: {
      type: String,
      max: 60,
    },

    groupDisplayPicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GroupMessaging = new mongoose.model("GroupMessaging", groupMessagingSchema);

export default GroupMessaging;
