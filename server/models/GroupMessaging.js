import mongoose from "mongoose";

const groupMessagingSchema = new mongoose.Schema(
  {
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

const GroupMessaging = new mongoose.model(
  "GroupMessaging",
  groupMessagingSchema
);

export default GroupMessaging;
