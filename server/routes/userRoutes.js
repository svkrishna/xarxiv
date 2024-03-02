import express from "express";
import {
  adminMiddleware,
  protectedRoutesWithParser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  userLogin,
  getUserProfile,
  logoutUser,
  userSignUp,
  updateUserProfile,
  toggleUserRole,
  getAllUsersList,
} from "../controller/userController.js";

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protectedRoutesWithParser, getUserProfile)
  .put(protectedRoutesWithParser, updateUserProfile);

//admin
router.get(
  "/getAllUsers",
  protectedRoutesWithParser,
  adminMiddleware,
  getAllUsersList
);

router.patch(
  "toggleRole/:userId",
  protectedRoutesWithParser,
  adminMiddleware,
  toggleUserRole
);

export default router;
