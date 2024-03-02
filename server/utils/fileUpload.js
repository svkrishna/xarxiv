import multer, { diskStorage } from "multer";
import { extname } from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/papers/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".doc", ".docx"];
  if (!allowedTypes.includes(extname(file.originalname).toLowerCase())) {
    cb(new Error("Unsupported file type"), false);
  } else {
    cb(null, true);
  }
};

export const uploadFile = multer({ storage: storage, fileFilter: fileFilter });
