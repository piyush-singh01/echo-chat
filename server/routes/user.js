import { Router } from "express";
import { updateMe } from "../controllers/user";
import { protect } from "../controllers/auth";
const router = Router();

router.patch("/update-me", protect, updateMe);   // pass middlewares in sequence.

export default router;
