import express from "express";
import {
  getUserRecord,
  signup,
  signin,
  googleLogin,
} from "../controller/user.js";
import { verifyUser } from "../middleware/user.js";

const router = express.Router();

router.get("/:id", verifyUser, getUserRecord);
router.post("/signup", signup);
router.post("/signin", googleLogin);
router.post("/googlelogin", googleLogin);

export default router;
