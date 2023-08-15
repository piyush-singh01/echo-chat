import { Router } from "express";
import { forgotPassword, login, register, resetPassword, sendOTP, verifyOTP } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
router.post("/register", register, sendOTP);
router.post("/send-otp", sendOTP); // we are creating this end point to resend otp in case it wasn't delivered.
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
