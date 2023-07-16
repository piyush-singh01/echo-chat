import Users from "../models/Users";
import filterObj from "../utils/filterObj";

//* all user controllers are protected, the auth middleware is mounted before user.

export const updateMe = async (req, res, next) => {
  // this updateMe middleware or endpoint will be protected, as we are passing control to the next middleware, in the protect. you need to be authorized to make changes to you profile.

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
