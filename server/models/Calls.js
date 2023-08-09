import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    callDuration: {
        type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Call = new mongoose.model("Call", callSchema);
export default Call;