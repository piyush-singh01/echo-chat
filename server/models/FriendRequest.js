import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "request sender is required"],
    },

    recipient: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "request receiver is required"],
    },
  },
  {
    timestamps: true,
  }
);

const FriendRequest = new mongoose.model("FriendRequest", requestSchema);
export default FriendRequest;
