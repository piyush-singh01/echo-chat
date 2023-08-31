import { Router } from "express";
import { getFriendRequests, getFriends, getUsers, updateMe } from "../controllers/user.js";
import { protect } from "../controllers/auth.js";

const router = Router();

router.patch("/update-me", protect, updateMe);
router.get("/get-users", protect, getUsers);
router.get("/get-friends", protect, getFriends);
router.get("/get-friend-requests", protect, getFriendRequests);

export default router;