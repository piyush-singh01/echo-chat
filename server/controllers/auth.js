/* IMPORTS */
// Module Imports
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { Schema } from "mongoose";
import crypto from "crypto";
import "dotenv/config";

// Model Imports
import User from "../models/Users.js";

// Mail service imports
import * as mailService from "../services/mailer.js";
import otpMail from "../mails/otpMail.js";
import forgotPasswordMail from "../mails/forgotPasswordMail.js";

// Custom Utils imports
import filterObj from "../utils/filterObj.js";
import OTP from "../utils/OTPGenerator.js";
import CustomError from "../utils/CustomError.js";
import informPasswordMail from "../mails/informPasswordResetMail.js";

/* FUNCTIONS */
/**
 * Wrapper function which signs and returns the JWT token
 * @param {Schema.Types.ObjectId} userId The ._id of the user for which the token is being generated
 * @returns {*} The generated user JWT Token
 */
const signToken = (userId) => {
  const signOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    algorithm: "HS512",
  };
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, signOptions);
};

/* CONTROLLERS */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if either email or password are empty
    if (!email || !password) {
      res.status(400).json({
        status: "error",
        message: "Both Email and Password are required",
      });
      return;
    }

    // if no user found or incorrect password
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(400).json({
        status: "error",
        message: "Invalid Credentials",
      });
      return;
    }

    // if user is not verified
    if (!user.verified) {
      res.status(400).json({
        status: "error",
        message: "Account is not verified.",
      });
      return;
    }

    // sign the user in, send the authentication token back
    const token = signToken(user._id);
    res.status(200).json({
      status: "OK",
      message: "Successfully logged in",
      token,
      user_id: user._id,
    });
  } catch (ex) {
    const err = new CustomError("Server Error: Error Logging In", 500, ex);
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "email",
      "password"
    );

    const existing_user = await User.findOne({ email: email });
    if (existing_user && existing_user.verified) {
      // if already existing
      res.status(400).json({
        status: "error",
        message: "Email already in use. Please Login",
      });
    } else if (existing_user) {
      // if user existing, but not verified, then update the fields, and send OTP
      existing_user.firstName = filteredBody.firstName;
      existing_user.lastName = filteredBody.lastName;
      existing_user.password = filteredBody.password;
      existing_user.save({ new: true, validateModifiedOnly: true });

      // we add the user._id to the request body and pass it on to the next middleware, which will generate OTP
      req.userId = existing_user._id;
      next();
    } else {
      // if new user, the create a new entry and send OTP
      const newUser = await User.create(filteredBody);
      req.userId = newUser._id;
      next();
    }
  } catch (ex) {
    const err = new CustomError(
      "Server Error: Error Creating Account",
      500,
      ex
    );
    next(err);
  }
};

// Mounted next to register, as well as standalone(to resend OTP)
export const sendOTP = async (req, res, next) => {
  const { userId } = req;
  const { firstName, lastName } = req.body;
  const newOTP = new OTP();
  const user = await User.findById(userId);

  try {
    user.otpExpiryTime = newOTP.expiryTime;
    user.otp = newOTP.OTP.toString();
    await user.save({ new: true, validateModifiedOnly: true });

    mailService
      .sendEmail({
        from: "echochat.automail@gmail.com",
        recipient: user.email,
        subject: "Login OTP for Echo Chat",
        text: `Your OTP is ${newOTP.OTP} and is valid for 10 minutes.`,
        html: otpMail(firstName + " " + lastName, newOTP.OTP),
        attachments: [],
      })
      .then(() => {
        console.log(`Sent Mail to ${user.email}`);
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({
      status: "Success",
      message: "OTP Sent successfully",
    });
  } catch (ex) {
    user.otpExpiryTime = undefined;
    user.otp = undefined;
    await user.save({ new: true, validateModifiedOnly: true });

    const err = new CustomError(
      "Error sending mail, please try again later",
      500,
      ex
    );
    next(err);
  }
};

export const verifyOTP = async (req, res) => {
  try {
    // verify OTP and update user record accordingly.
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      otpExpiryTime: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        status: "error",
        message: "Email is invalid or OTP has expired",
      });
      return;
    }

    if (user.verified) {
      res.status(400).json({
        status: "error",
        message: "Email is already verified",
      });
      return;
    }

    if (!(await user.correctOTP(otp, user.otp))) {
      res.status(400).json({
        status: "error",
        message: "OTP is incorrect",
      });
      return;
    }

    // If otp is correct
    user.verified = true;
    user.otp = undefined; // save otp as undefined after it has been verified
    user.otpExpiryTime = undefined;

    await user.save({ new: true, validateModifiedOnly: true });

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      message: "OTP Verification Successful",
      token,
      user_id: user._id,
    });
  } catch (ex) {
    const err = new CustomError("Error sending OTP", 500, ex);
    next(err);
  }
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "No user with the given email address",
    });
    return;
  }

  const resetToken = await user.createPasswordResetToken();
  const resetUrl = `http://localhost:3000/auth/reset-password?verify=${resetToken}`;

  try {
    console.log(user);
    mailService
      .sendEmail({
        from: "echochat.automail@gmail.com",
        recipient: user.email,
        subject: "Reset Password link for Echo Chat",
        text: `The reset password link is valid for 10 minutes.`,
        html: forgotPasswordMail(
          user.firstName + " " + user.lastName,
          resetUrl
        ),
        attachments: [],
      })
      .then(() => {
        console.log(`Sent Mail to ${user.email}`);
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({
      status: "success",
      message: "Reset password link sent",
    });
  } catch (ex) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    await user.save({ new: true, validateModifiedOnly: true });

    const err = new CustomError(
      "There was an error sending the email, please try again later.",
      500,
      ex
    );
    next(err);
  }
};

export const resetPassword = async (req, res) => {
  console.log(req.body);
  // Get the reset token from the request body and hash it
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");

  // Find the user based on the hashed token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpire: { $gt: Date.now() },
  });

  // Not Found
  if (!user) {
    res.status(400).json({
      status: "Error",
      message: "Token is invalid or expired", // should the user be aware of token?
    });
    return;
  }

  // Found
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  mailService
    .sendEmail({
      from: "echochat.automail@gmail.com",
      recipient: user.email,
      subject: "Confirmation: Password for you account changed.",
      text: `Account password changed recently`,
      html: informPasswordMail(user.firstName + " " + user.lastName), // TODO: Send time as well.
      attachments: [],
    })
    .then(() => {
      console.log(
        `Sent confirmation mail for password change to ${user.email}`
      );
    })
    .catch((err) => {
      console.log(err);
    });

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "Password reset successful",
    token,
  });
};

/**
 * PROTECTOR
 * Middleware for protecting routes by enforcing JWT authentication
 *
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @param {Function} next Callback function to pass control to the next middleware
 *
 * @throws Throws an error if any check fails.
 */
export const protect = async (req, res, next) => {
  // Get the token JWT from the client side.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // the bearer token
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    req.status(400).json({
      status: "error",
      message: "You are not authorized to view this page",
    });
    return;
  }

  // Verification of token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // Check if the user still exists and is not banned
  const this_user = await User.findById(decoded.userId);
  if (!this_user) {
    res.status(400).json({
      status: "error",
      message: "The user doesn't exists",
    });
    return;
  } else if (this_user.isBanned && this_user.isBanned === true) {
    res.status(400).json({
      status: "error",
      message: "The user is not authorized to view this page",
    });
    return;
  }

  // Check if user changed their password after token was issued
  if (this_user.changedPasswordAfter(decoded.iat)) {
    res.status(400).json({
      status: "error",
      message: "password was changed recently, please login again",
    });
    return;
  }
  req.user = this_user;
  next();
};
