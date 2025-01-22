import multer from "multer";
import * as feedback from "../controllers/feedback.controller.js";
import path from "path";
import express from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith("image/")
      ? cb(null, true)
      : cb(new Error("Only image files are allowed!"));
  },
});

export default (app) => {
  const router = express.Router();
  router.post("/predict", upload.single("image"), feedback.createPrediction);
  router.post("/save", feedback.saveAnnotations);
  router.get("/test-db", feedback.testDatabase);

  app.use("/api/feedback", router);
};
