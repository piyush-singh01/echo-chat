import { Router } from "express";
import { getFriendRequests, getFriends, getAllNonFriendUsers, updateMyProfile, getMyProfile, getAllConversations } from "../controllers/user.js";
import { protect } from "../controllers/auth.js";

const router = Router();

router.get("/me", protect, getMyProfile);
router.patch("/update-me", protect, updateMyProfile);
router.get("/get-all-non-friends", protect, getAllNonFriendUsers);
router.get("/get-friends", protect, getFriends);
router.get("/get-friend-requests", protect, getFriendRequests);


router.get("/get-all-conversations", protect, getAllConversations);
export default router;