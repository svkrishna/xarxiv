import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateToken = (res, userId, expiresIn = "2d") => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  const csrfToken = crypto.randomBytes(24).toString("hex");
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 2); // Set it to 2 days from now

  // JWT Token
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: expiration,
  });

  // CSRF Token
  res.cookie("XSRF-TOKEN", csrfToken, {
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: expiration,
  });

  return csrfToken;
};

export { generateToken };
