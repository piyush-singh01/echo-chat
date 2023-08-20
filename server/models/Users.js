import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "First Name is Required"],
      trim: true,
      lowercase: true,
      min: 2,
      max: 20,
    },

    lastName: {
      type: String,
      // require: [true, "Last Name is Required"],
      default: "",
      lowercase: true,
      trim: true,
      min: 1,
      max: 20,
    },

    email: {
      type: String,
      require: [true, "Email is Required"],
      unique: [true, "Account with this email already exists"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return String(email)
            .trim()
            .toLowerCase()
            .match(
              /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
            );
        },
        message: (props) => `Email ${props.value} is invalid`,
      },
    },

    password: {
      type: String,
      require: [true, "Password is required"],
    },

    isBanned: {
      type: Boolean,
      default: false,
    },

    profilePicture: {
      type: String,
    },

    about: {
      type: String,
      max: [60, "max 60 characters limit for about section"],
    },

    passwordLastUpdatedAt: {
      type: Date,
      require: true,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetTokenExpire: {
      type: Date,
    },

    otp: {
      type: String,
      trim: true,
    },

    otpExpiryTime: {
      type: Date,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    socket_id: {
      type: String,
    },

    status: {
      type: String,
      required: true,
      enum: ["online", "offline"],
      default: "offline",
    },

    lastSeen: {
      type: Date,
      require: true,
    },

    // Reference to all the friends of the users
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    // Reference to all the DMs, the user is a part of
    directMessageRooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "DirectMessaging",

        starredMessages: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "DirectMessages",
          },
        ],

        mute_status: {
          type: Boolean,
          default: false,
        },

        archived: {
          type: Boolean,
          default: false,
        },

        pinned: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Reference to all the groups the user is a part of
    groupMessageRooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "GroupMessaging",

        starredMessages: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "GroupMessages",
          },
        ],

        mute_status: {
          type: Boolean,
          default: false,
        },

        archived: {
          type: Boolean,
          default: false,
        },

        pinned: {
          type: Boolean,
          default: false,
        },
      },
    ],

    calls: [
      {
        type: mongoose.Schema.ObjectId,
        // ref: "",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* PRE HOOKS WITH 'SAVE' */
// OTP Hash
userSchema.pre("save", async function (next) {
  if (this.otp && this.isModified("otp")) {
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp.toString(), salt);
  }
  next();
});

// Password Hash
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password.toString(), salt);
  }
  next();
});

/* METHODS */
// Checks if password changed after the given timestamp
userSchema.methods.changedPasswordAfter = function (timestamp) {
  return timestamp < this.passwordLastUpdatedAt;
};

// Checks if the provided password is correct
userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Checks if the provided OTP is correct
userSchema.methods.correctOTP = async (candidateOTP, userOTP) => {
  return await bcrypt.compare(candidateOTP, userOTP);
};

// Creates a reset token for password change
userSchema.methods.createPasswordResetToken = async function () {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the reset token before storing it in database (for security)
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex"); // save the hashed value of reset token in db

  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000; // also create a function for this(?)
  await this.save({ new: true, validateModifiedOnly: true });
  return resetToken;
};

/* EXPORT */
const User = new mongoose.model("User", userSchema);
export default User;
