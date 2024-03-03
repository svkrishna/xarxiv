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

    res.status(200).json(papersWithFullPaths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { submitPaper, getMyPapers };
