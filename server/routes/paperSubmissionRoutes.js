import express from "express";
import {
  adminMiddleware,
  protectedRoutesWithParser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

import { submitPaper } from "../controller/paperController.js";
import { uploadFile } from "../utils/fileUpload.js";

router.post(
  "/submitPaper",
  protectedRoutesWithParser,
  uploadFile.single("paperFile"),
  submitPaper
);

export default router;
