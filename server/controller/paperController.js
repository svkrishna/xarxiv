import asyncHandler from "express-async-handler";
//modals
import PaperModal from "../modals/PaperModal.js";

// @desc submit paper
// route POST /api/papers/submitPaper
// @ccess PRIVATE
const submitPaper = asyncHandler(async (req, res) => {
  try {
    const { title, authors, abstract, subjectArea } = req.body;
    const submittedBy = req.user._id;

    const paperFilePath = req.file.path;

    const paper = new PaperModal({
      title,
      authors,
      abstract,
      subjectArea,
      paperFilePath,
      submittedBy,
    });

    await paper.save();

    res.status(201).json({
      message: "Paper submitted successfully",
      paper: {
        id: paper._id,
        title: paper.title,
        authors: paper.authors,
        abstract: paper.abstract,
        paperFilePath: paper.paperFilePath,
        submittedBy: paper.submittedBy,
        status: paper.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get all paper details
// @route GET /api/papers/getAllPapers
// @access PUBLIC
const getAllPapers = asyncHandler(async (req, res) => {
  try {
    const papers = await PaperModal.find({}); // No filter, gets all papers

    const papersWithFullPaths = papers.map((paper) => {
      let filePath = paper.paperFilePath.replace(/\\/g, "/");
      filePath = filePath.startsWith("uploads/")
        ? filePath
        : `uploads/${filePath}`;

      return {
        ...paper.toObject(),
        paperFilePath: `${req.protocol}://${req.get("host")}/${filePath}`,
      };
    });

    res.status(200).json({
      data: papersWithFullPaths,
      message: "All paper details fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get paper details for the logged-in user
// @route GET /api/papers/getMyPapers
// @access PRIVATE
const getMyPapers = asyncHandler(async (req, res) => {
  try {
    const submittedBy = req.user._id;

    const papers = await PaperModal.find({ submittedBy });

    const papersWithFullPaths = papers.map((paper) => {
      let filePath = paper.paperFilePath.replace(/\\/g, "/");
      filePath = filePath.startsWith("uploads/")
        ? filePath
        : `uploads/${filePath}`;

      return {
        ...paper.toObject(),
        paperFilePath: `${req.protocol}://${req.get("host")}/${filePath}`,
      };
    });

    res.status(200).json({
      data: papersWithFullPaths,
      message: "paper Details fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update a paper submission
// @route PUT /api/papers/updatePaper/:id
// @access PRIVATE
const updatePaper = asyncHandler(async (req, res) => {
  const { title, authors, abstract } = req.body;
  const paper = await PaperModal.findById(req.params.id);

  if (paper) {
    paper.title = title;
    paper.authors = authors;
    paper.abstract = abstract;
    paper.subjectArea = subjectArea;

    if (req.file) {
      paper.paperFilePath = req.file.path;
    }

    const updatedPaper = await paper.save();
    res.json({ data: updatedPaper, message: "Details updated successfully." });
  } else {
    res.status(404).json({ message: "Paper not found" });
  }
});

// @desc Update paper status
// @route PATCH /api/papers/paperStatus/:id
// @access PRIVATE
const updatePaperStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const paper = await PaperModal.findById(req.params.id);

  if (paper) {
    // enum
    const validStatuses = [
      "submitted",
      "under review",
      "accepted",
      "rejected",
      "withdrawn",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    paper.status = status;
    await paper.save();

    res.json({
      message: `Paper status updated to ${status} successfully`,
      paper: {
        id: paper._id,
        status: paper.status,
      },
    });
  } else {
    res.status(404).json({ message: "Paper not found" });
  }
});

// @desc Add a comment to a paper
// @route POST /api/papers/addComment/:id
// @access PRIVATE
const addCommentToPaper = asyncHandler(async (req, res) => {
  const paperId = req.params.id;
  const { text } = req.body;
  const commentedBy = req.user._id;

  const paper = await PaperModal.findById(paperId);

  if (paper) {
    const newComment = {
      text,
      commentedBy,
    };

    paper.comments.push(newComment);
    await paper.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } else {
    res.status(404).json({ message: "Paper not found" });
  }
});

// Update a comment on a paper
// @route PUT /api/papers/updateComment/:paperId/:commentId
// @access PRIVATE
const updateCommentOnPaper = asyncHandler(async (req, res) => {
  const { paperId, commentId } = req.params;
  const { text } = req.body;

  const paper = await PaperModal.findById(paperId);

  if (paper) {
    const comment = paper.comments.id(commentId);
    if (comment) {
      if (comment.commentedBy.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "User not authorized" });
        return;
      }
      comment.text = text;
      await paper.save();
      res.status(200).json({ message: "Comment updated successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } else {
    res.status(404).json({ message: "Paper not found" });
  }
});

// Delete a comment on a paper
// @route DELETE /api/papers/deleteComment/:paperId/:commentId
// @access PRIVATE
const deleteCommentFromPaper = asyncHandler(async (req, res) => {
  const { paperId, commentId } = req.params;

  const paper = await PaperModal.findById(paperId);

  if (paper) {
    const comment = paper.comments.id(commentId);
    if (comment) {
      if (comment.commentedBy.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "User not authorized" });
        return;
      }
      comment.remove();
      await paper.save();
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } else {
    res.status(404).json({ message: "Paper not found" });
  }
});

// @desc Search for papers by title, authors, abstract, and subject area
// @route GET /api/papers/searchPapers
// @access PUBLIC

const searchPapers = asyncHandler(async (req, res) => {
  try {
    const { searchTerm, date, subjectArea, authors } = req.query;
    let query = {};
    if (searchTerm) {
      query.$or = [
        { title: new RegExp(searchTerm, "i") },
        { abstract: new RegExp(searchTerm, "i") },
      ];
    }

    if (date) {
      query.createdAt = { $gte: new Date(date) };
    }

    if (subjectArea) {
      query.subjectArea = new RegExp(subjectArea, "i");
    }

    if (authors) {
      query.authors = { $in: authors.split(",") };
    }

    const papers = await PaperModal.find(query).lean();

    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  submitPaper,
  getAllPapers,
  getMyPapers,
  updatePaper,
  updatePaperStatus,
  addCommentToPaper,
  updateCommentOnPaper,
  deleteCommentFromPaper,
  searchPapers,
};
