import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
//routes
import userRoutes from "./routes/userRoutes.js";
import paperSubmissionRoutes from "./routes/paperSubmissionRoutes.js";

const port = process.env.PORT || 5000;
connectDb();

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Hello");
});

/////ROUTES INIITIATE////

//users
app.use("/api/users", userRoutes);
//papers submission
app.use("/api/papers", paperSubmissionRoutes);

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port}`));
