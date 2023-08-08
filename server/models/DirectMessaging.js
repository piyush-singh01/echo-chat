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
        message: "one to one chat room should have exaclty two participants",
      },
    },

    // should remove the messages field as the DirectMessages schema already has a back reference to the room_id.
    // messages: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "DirectMessages",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const DirectMessaging = new mongoose.model(
  "DirectMessaging",
  directMessagingSchema
);

export default DirectMessaging;
