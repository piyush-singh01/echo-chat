import User from "../models/Users.js";
import FriendRequest from "../models/FriendRequest.js";
import filterObj from "../utils/filterObj.js";

// All controllers are protected(or authenticated). The auth controllers are mounted before user controllers.


// Update Profile
export const updateMe = async (req, res) => {

  const { user } = req;
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );
  
  const updated_user = await User.findByIdAndUpdate(user._id, filteredBody, {
    new: true,
    validateModifiedOnly: true,
  });

  res.send(200).json({
    status: "success",
    data: updated_user,
    message: "Profile update successfully",
  });
};


// Get all verified users
export const getUsers = async (req, res) => {

  const all_users = await User.find({
    verified: true,
  }).select("firstName lastName _id");

  
  const this_user = req.user; // The protect middleware will be called before this. comes from there. THis user essentially comes from decoding the jwt token in the localstorage.
  const other_users = all_users?.filter(
    (user) =>
      !this_user.friends.includes(user._id) &&
      user._id.toString() !== req.user._id.toString()
  ); // returns only those users that are not our friends already. second condition excludes self.

  res.status(200).json({
    status: "success",
    data: other_users,
    message: "All users fetched successfully",
  });
};

export const getFriends = async (req, res, next) => {
  const curr_user = await User.findById(req.user._id).populate(
    "friends",
    "_id firstName lastName"
  ); // populate the friends field with their _id firstName and lastName, the field originally contain only the reference to the friends via their object id. nice abstraction of join

  res.status(200).json({
    status: "success",
    data: curr_user.friends,
    message: "All friends fetched successfully",
  });
};

// get all friend requests that you have recieved
export const getFriendRequests = async (req, res, next) => {
  // find all objects in which the user is the reciepient and populate the sender field to find out who sent these requests.
  const requests = await FriendRequest.find({
    recipient: req.user._id,
  })
    .populate("sender")
    .select("_id firstName lastName");

  res.status(200).json({
    status: "success",
    data: requests,
    message: "All friend requests fetched successfully",
  });
};
