import express from "express";
import {
  adminMiddleware,
  protectedRoutesWithParser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addCommentToPaper,
  deleteCommentFromPaper,
  getAllPapers,
  getMyPapers,
  getPaperDetailsById,
  submitPaper,
  updateCommentOnPaper,
  updatePaperStatus,
} from "../controller/paperController.js";
import { uploadFile } from "../utils/fileUpload.js";

router.post(
  "/submitPaper",
  protectedRoutesWithParser,
  uploadFile.single("paperFile"),
  submitPaper
);
router.get("/getAllPapers", getAllPapers);
router.get("/getMyPapers", protectedRoutesWithParser, getMyPapers);
router.get(
  "/getPaperDetailsById/:id",
  protectedRoutesWithParser,
  getPaperDetailsById
);

router.patch(
  "/updatePaperStatus/:id",
  protectedRoutesWithParser,
  updatePaperStatus
);

router.patch(
  "/updatePaperStatusAdmin/:id",
  protectedRoutesWithParser,
  adminMiddleware,
  updatePaperStatus
);

//comment
router.post("/addComment/:id", protectedRoutesWithParser, addCommentToPaper);
router.put(
  "/updateComment/:paperId/:commentId",
  protectedRoutesWithParser,
  updateCommentOnPaper
);
router.delete(
  "/deleteComment/:paperId/:commentId",
  protectedRoutesWithParser,
  deleteCommentFromPaper
);

export default router;
