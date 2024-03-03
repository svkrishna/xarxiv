import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: [String],
    abstract: {
      type: String,
      required: true,
    },
    paperFilePath: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectArea: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["submitted", "under review", "accepted", "rejected", "withdrawn"],
      default: "submitted",
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const PaperModal = mongoose.model("Paper", paperSchema);

export default PaperModal;
