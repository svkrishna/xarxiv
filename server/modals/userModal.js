import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["reader", "administrator"],
      default: "reader",
    },
  },
  {
    timestamps: true,
  }
);

const UserModal = mongoose.model("User", userSchema);

module.exports = UserModal;
