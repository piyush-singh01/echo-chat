import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { promisify } from "util";
import User from "../models/Users.js";
import filterObj from "../utils/filterObj.js";

// token based authorization on the client side, look more into jwt and so later on
const signToken = (userId) => {
  jwt.sign({ userId }, process.env.JWT_SECRET_KEY); // header is the default header here. we can also supply header as the third argument.
  // We are using the userId to create the token
};

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // note we can not simply destructure the request body in the db.update() function, say a user can provide req.body.verify=true from the client side then the user will get updated.
    // So we need to filter the body.
    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "email",
      "password"
    );
    const existing_user = await User.findOne({ email: email });

    if (existing_user && existing_user.verified) {
      res.send(400).json({
        //sure you want it to send this status code?
        status: "error",
        message: "Email already in use. Please Login",
      });
    } else if (existing_user) {
      await User.findOneAndUpdate({ email: email }, filteredBody, {
        new: true, // causes the value to be returned after the update, else the old value will be returned
        validateModifiedOnly: true, // onluy validate the fields again that are modified
      });
      req.userId = existing_user._id; // add the user id to the request body
      next(); // pass control to the next middleware, which will be generate otp and send to user.
    } else {
      // if no record in database.
      const newUser = await User.create(filteredBody);
      //generate OTP and send to user
      req.userId = newUser._id;
      next();
    }
  } catch (ex) {
    next(ex);
  }
};

// ! See this
/*
class OTP {
  constructor() {
    this.code = otp.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    this.expireDate = Date.now() + 10 * 60 * 1000;
    this.generatedAt = Date.now();
  }
  get isExpired() {
    return Date.now() > this.expireDate;
  }
}
const x = new OTP();
console.log(x);
console.log(x.isExpired);
*/

export const sendOTP = async (req, res, next) => {
  const { userId } = req;
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const otpExpiryTime = Date.now() + 10 * 60 * 1000; //after 10 minutes

  await User.findByIdAndUpdate(userId, {
    otp: OTP,
    otpExpiryTime,
  });

  // TODO: Send mail

  res.send(200).json({
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

    // We can not simply store the OTP as plain text and compare them, as the backend devs would have access to the user otp and which would not be a good thing
    if (!(await user.correctOTP(otp, user.otp))) {
      res.status(400).json({
        // TODO: note, we are repeating this pattern many times, of sending back response, create a class of this DRY
        status: "Error",
        message: "OTP is incorrect",
      });
      return;
    }

    // if otp is correct
    user.verified = true;
    user.otp = undefined; // save otp as undefined after it has been verified

    await user.save({ new: true, validateModifiedOnly: true });

    const token = signToken(user._id);

    res.send(200).json({
      status: "OK",
      message: "OTP Verification Succesful",
      token, //token is sent along
    });
  } catch (ex) {
    next(ex);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // TODO: See standard ways of doing this.
      res.status(400).json({
        status: "Error",
        message: "Both Email and Password are required",
      });
      return;
    }

    const user = await User.findOne({ email: email }).select("+password"); // The + here explicitly includes the password field, even if it was originally set to select: false, in Schema.

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.send(400).json({
        status: "Error",
        message: "Invalid Credentials",
      });
    }

    // https://stackoverflow.com/questions/37582444/jwt-vs-cookies-for-token-based-authentication
    // npm i jose --> use this?
    // see more on jwt, see standard codes of apps.
    const token = signToken(user._id);

    res.send(200).json({
      status: "OK",
      message: "Succesfully logged in",
      token, //token is sent along
    });
  } catch (ex) {
    next(ex);
  }
};

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
    // ! shuold we not return?
  }
  req.user = this_user;
  next();
};

export const forgotPassword = async (req, res, next) => {
  // * Get user Email
  const user = await User.findOne({ email: req.body.email }); // What if no email in user body? do we need to have some checks for that?
  if (!user) {
    res.status(400).json({
      status: "Error",
      message: "No user with the given email address",
    });
  }

  // * Generate a random reset token.
  // https://...?code=9u38xeuwe
  const resetToken = user.createPasswordResetToken();
  const resetUrl = `https://domain.com/auth/reset-password?code=${resetToken}`;

  try {
    // TODO: send email with reset URL
    res.status(200).json({
      status: "success",
      message: "reset password link sent",
    });
  } catch (ex) {
    // !similar catch block for all others?
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    user.save({ validateBeforeSave: false });

    res.send(500).json({
      status: "Error",
      message: "There was an error sending the email, please try again later.",
    });
  }
};

export const resetPassword = async (req, res, next) => {
  //* 1) Get the user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
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
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  //* 4) Log in and send JWT.
  // TODO: Send an email to user informing about password reset
  const token = signToken(user._id);
  res.send(200).json({
    status: "success",
    message: "Password Reseted Successfully",
    token,
  });
};
