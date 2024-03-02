import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
//helpers
import { generateToken } from "../utils/generateToken.js";
import matchPassword from "../utils/matchPassword.js";

// @desc authenticated users/ token
// route POST /api/users/login
// @ccess PUBLIC
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModal.findOne({ email });

  if (user && matchPassword(password, user.password)) {
    generateToken(res, user._id);
    res.status(200).json({
      data: {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// @desc register a new user
// route POST /api/users/signup
// @ccess PUBLIC
const userSignUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUserByEmail = await UserModal.findOne({ email });
  if (existingUserByEmail) {
    res
      .status(400)
      .json({ message: "User with this email already exists. Please Login." });
    return;
  }

  const newUser = new UserModal({
    username,
    email,
    password,
  });

  await newUser.save();
  generateToken(res, newUser._id);

  const userForResponse = await UserModal.findById(newUser._id).select(
    "-password"
  );

  res.status(201).json({
    message: "User registered successfully.",
    user: userForResponse,
  });
});

// @desc logout
// route POST /api/users/logout
// @ccess PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  // Clear JWT Token
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  // Clear CSRF Token
  res.cookie("XSRF-TOKEN", "", {
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Successfully logged out.",
  });
});

// @desc get user profile
// route GET /api/users/profile
// @ccess PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModal.findById(req.user._id).select("-password");

  if (user) {
    res.status(200).json({
      message: "User details fetched successfully.",
      user,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc update user profile
// route PUT /api/users/profile
// @ccess PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModal.findById(req.user._id);
  const existingEmailUser = await UserModal.findOne({ email: req.body.email });

  res.send("Hello");
});

// @desc update user profile
// route PUT /api/users/getAllUsers
// @ccess PRIVATE (for admin)
const getAllUsersList = asyncHandler(async (req, res) => {
  try {
    // Fetch all users excluding passwords
    const users = await UserModal.find({}).select("-password");
    res.status(200).json({
      message: "All users fetched successfully.",
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

// @desc Toggle user role between "admin" and "reader"
// @route PATCH /api/users/toggleRole/:userId
// @access PRIVATE (for admin)
const toggleUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Toggle
    user.role = user.role === "admin" ? "reader" : "admin";
    await user.save();

    res.status(200).json({
      message: "User role updated successfully.",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while toggling user role." });
  }
});

export {
  userLogin,
  userSignUp,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsersList,
  toggleUserRole,
};
