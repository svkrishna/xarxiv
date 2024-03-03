import express from "express";
import {
  adminMiddleware,
  protectedRoutesWithParser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

import { getMyPapers, submitPaper } from "../controller/paperController.js";
import { uploadFile } from "../utils/fileUpload.js";

router.post(
  "/submitPaper",
  protectedRoutesWithParser,
  uploadFile.single("paperFile"),
  submitPaper
);
router.get("/getMyPapers", protectedRoutesWithParser, getMyPapers);

export default router;
