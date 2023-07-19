import { Router } from "express";
import { getUsers, updateMe } from "../controllers/user.js";
import { protect } from "../controllers/auth.js";
const router = Router();

router.patch("/update-me", protect, updateMe); // pass middlewares in sequence.
router.post("/get-users", protect, getUsers);

export default router;
