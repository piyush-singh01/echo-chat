/* IMPORTS */
// Module Imports
import jwt from "jsonwebtoken";
import { promisify } from "util";
import crypto from "crypto";
import "dotenv/config";

// Model Imports
import User from "../models/Users.js";

// Mail service imports
import * as mailService from "../services/mailer.js";
import otpMail from "../mails/otpMail.js";
import resetPasswordMail from "../mails/resetPasswordMail.js";

// Custom Utils imports
import filterObj from "../utils/filterObj.js";
import OTP from "../utils/OTPGenerator.js";

/* FUNCTIONS */
// Wrapper function which signs and returns the JWT token
const signToken = (userId) => {
  const signOptions = {
    expiresIn: "1d",
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
      message: "Succesfully logged in",
      token,
      user_id: user._id,
    });

  } catch (ex) {
    console.log(ex);
    next(ex);
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
      // if already exisiting
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
    next(ex);
  }
};

// Mounted next to register, as well as standalone(to resend OTP)
export const sendOTP = async (req, res) => {
  const { userId } = req;
  const { firstName, lastName } = req.body;
  const newOTP = new OTP();

  const user = await User.findById(userId);
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
    message: "OTP Sent succesfully",
  });
};

export const verifyOTP = async (req, res, next) => {
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
      message: "OTP Verification Succesful",
      token,
      user_id: user._id,
    });
  } catch (ex) {
    next(ex);
  }
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }); // What if no email in user body? do we need to have some checks for that?
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "No user with the given email address",
    });
  }

  const resetToken = await user.createPasswordResetToken();
  const resetUrl = `http://localhost:3000/auth/new-password?verify=${resetToken}`;

  try {
    console.log(user);
    mailService
      .sendEmail({
        from: "echochat.automail@gmail.com",
        recipient: user.email,
        subject: "Reset Password link for Echo Chat",
        text: `The reset password link is valid for 10 minutes.`,
        html: resetPasswordMail(user.firstName + " " + user.lastName, resetUrl),
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
    // !similar catch block for all others?
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ new: true, validateModifiedOnly: true });

    res.status(500).json({
      status: "Error",
      message: "There was an error sending the email, please try again later.",
    });
  }
};

export const resetPassword = async (req, res, next) => {
  //* 1) Get the user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex"); // we will be getting it as a param, why?

  // ? Are we querying with the hashed token, really?
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  //* 2)

  if (!user) {
    res.status(400).json({
      status: "Error",
      message: "Token is invalid or expired", // should the user be aware of token?
    });
    return;
  }

  //* 3)
  user.password = req.body.password;
  user.confirmPassword = undefined; //! shuold this not be on client side, besides where are we even comparing it with the password?
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  //* 4) Log in and send JWT.
  // TODO: Send an email to user informing about password reset
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "Password Reseted Successfully",
    token,
  });
};




// PROTECTOR
//* Signup => Register => sendotp => verifyotp
//* Types of routes -> Protected(only authorized or logged in users can access this) and Unprotected routes, anyone with the address...
//authorization checks basically
export const protect = async (req, res, next) => {
  //* 1)Get the token JWT from the client side.
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

  //* 2) verification of token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  ); // await works with promises only(?)

  //* 3) check if the user still exists. if the user deleted account or the user is logged in from more than allowed devices or the user was banned
  const this_user = await User.findById(decoded.userId); // the name should be same because { userId }
  if (!this_user) {
    res.status(400).json({
      status: "error",
      message: "The user doesn't exists",
    });
    return;
  }

  //* 4) Check if user changed their password after token was issued
  if (this_user.changedPasswordAfter(decoded.iat)) {
    res.status(400).json({
      status: "error",
      message: "password was changed recently, please login again",
    });
    return;
    // ! shuold we not return?
  }
  req.user = this_user;
  next();
};