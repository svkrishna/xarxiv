import asyncHandler from "express-async-handler";
//modals
import PaperModal from "../modals/PaperModal.js";

// @desc submit paper
// route POST /api/papers/submitPaper
// @ccess PRIVATE
const submitPaper = asyncHandler(async (req, res) => {
  try {
    const { title, authors, abstract } = req.body;
    const submittedBy = req.user._id;

    const paperFilePath = req.file.path;

    const paper = new PaperModal({
      title,
      authors,
      abstract,
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

export {
  submitPaper,
  getAllPapers,
  getMyPapers,
  updatePaper,
  updatePaperStatus,
};
