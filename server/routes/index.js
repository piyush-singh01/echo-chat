import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";

const router = Router();

// path for all should be unique, else undefined behaviour
router.use("/auth", authRoute);
router.use("/user", userRoute);


