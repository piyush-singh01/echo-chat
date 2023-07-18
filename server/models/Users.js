import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "First Name is Required"],
    min: 2,
    max: 20,
  },
  lastName: {
    type: String,
    require: [true, "Last Name is Required"],
    min: 1,
    max: 20,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "Email is Required"],
    unique: [true, "Account with this email already exists"],
    validate: {
      validator: function (email) {
        return String(email)
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
  },

  confirmPassword: {
    type: String,
  },

  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpire: {
    type: Date,
  },

  // ?  instead of using createdAt and updatedAt in userSchema, can we just write timestamps:true.
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },

  otp: {
    type: String,
  },

  otpExpiryTime: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// ! see this
//* dont think need to do this
/* 
otp: {
      type: Number,
      set: (v) => {
        const salt = bcrypt.genSaltSync();
        const hashedOTP = bcrypt.hashSync(v, salt);
        return hashedOTP;
      },
    },
*/

// the pre hook with save.
userSchema.pre("save", async function (next) {
  //! should we remove async from here, since we are not returning The await operator is used to wait for a Promise and get its fulfillment value. It can only be used inside an async function or at the top level of a module.2
  // this will run on every save, so
  // only run when the otp is modified
  if (this.isModified("otp")) {
    // hash the otp
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp.toString(), salt); // this 12 is the salt(?)
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password.toString(), salt); //Hash the password every time password is updated or is created for the first time.
  }
  next();
});

userSchema.methods.changedPasswordAfter = function (timestamp) {
  return timestamp < this.passwordChangedAt;
};

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctOTP = async (candidateOTP, userOTP) => {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); // save the hashed value of reset token in db

  this.passwordResetExpire = Date.now() + 10 * 60 * 1000; // also create a function for this(?)

  return resetToken;
};

const User = new mongoose.model("User", userSchema);
export default User;
