import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//modals
import UserModal from "../modals/userModal.js";

const protectedRoutesWithParser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  const csrfToken = req.cookies["XSRF-TOKEN"];
  const csrfTokenFromHeader = req.headers["x-csrf-token"];

  if (token && csrfToken && csrfTokenFromHeader) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (csrfToken !== csrfTokenFromHeader) {
        res.status(403);
        throw new Error("CSRF token validation failed");
      }

      req.user = await UserModal.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token missing or CSRF token missing");
  }
});

const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Allowed only for admin");
  }
});

export { protectedRoutesWithParser, adminMiddleware };
