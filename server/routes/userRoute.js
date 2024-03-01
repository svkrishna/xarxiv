import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  userLogin,
  getUserProfile,
  logoutUser,
  userSignUp,
  updateUserProfile,
} from "../controller/userController.js";

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protectedRoutesWithParser, getUserProfile)
  .put(protectedRoutesWithParser, updateUserProfile);

export default router;
