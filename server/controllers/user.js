import User from "../models/Users.js";
import FriendRequest from "../models/FriendRequest.js";
import DirectMessaging from "../models/DirectMessaging.js";
import GroupMessaging from "../models/GroupMessaging.js";
import filterObj from "../utils/filterObj.js";
import CustomError from "../utils/CustomError.js";

// All controllers are protected(or authenticated).
// The auth controllers are mounted before user controllers.


// PROFILE CONTROLLERS
// Fetch Profile
export const getMyProfile = async (req, res) => {
  try {
    const { user } = req;
    const this_user = await User.findById(user._id).select("_id firstName lastName about");
  
    res.status(200).json({
      status: "success",
      data: this_user,
      message: "Profile Fetched Successfully",
    });
  } catch (ex) {
    const err = new CustomError("Internal Server Error. Please try again later.", 500, ex);
    next(err);
  }
};

// Update Profile
export const updateMyProfile = async (req, res) => {
  const { user } = req; // comes from the protect middleware
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about"
  );

  const updated_user = await User.findByIdAndUpdate(user._id, filteredBody, {
    new: true,
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: updated_user,
    message: "Profile update successfully",
  });
};





// Get all other verified users, that are not friends
// TODO: exclude those users which have already been requested, or make a separate route for all such users
export const getAllNonFriendUsers = async (req, res) => {
  const all_users = await User.find({
    verified: true,
  }).select("_id firstName lastName status");

  const this_user = req.user;
  const other_users = all_users?.filter(
    (user) => !this_user.friends.includes(user._id) && user._id.toString() !== req.user._id.toString()
  ); // returns only those users that are not our friends already. second condition excludes self.

  res.status(200).json({
    status: "success",
    data: other_users,
    message: "All users fetched successfully",
  });
};

export const getFriends = async (req, res, next) => {
  const curr_user = await User.findById(req.user._id).populate("friends", "_id firstName lastName"); // populate the friends field with their _id firstName and lastName, the field originally contain only the reference to the friends via their object id. nice abstraction of join

  res.status(200).json({
    status: "success",
    data: curr_user.friends,
    message: "All friends fetched successfully",
  });
};

// get all friend requests that you have received
export const getFriendRequests = async (req, res, next) => {
  // find all objects in which the user is the recipient and populate the sender field to find out who sent these requests.
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


// Chat Controllers
export const getAllConversations = async (req, res, next) => {
  const { user } = req;
  try {
    const allConversations = await User.findById(user._id)
      .populate({
        path: "directMessageRooms",
        populate: {
          path: "participants",
          select: "_id firstName lastName status pinned archived muted blocked",
        },
        select: "-starredMessages",
      })
      .select("directMessageRooms");

    res.status(200).json({
      status: "success",
      data: { ...allConversations, user_id: user._id },
      message: "All conversations fetched successfully",
    });
  } catch (ex) {
    const err = new CustomError("Internal Server Error. Please refresh or try again later.", 500, ex);
    next(err);
  }
};
