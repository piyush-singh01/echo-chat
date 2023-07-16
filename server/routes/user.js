import { Router } from "express";
import { updateMe } from "../controllers/user.js";
import { protect } from "../controllers/auth.js";
const router = Router();

router.patch("/update-me", protect, updateMe);   // pass middlewares in sequence.

export default router;
