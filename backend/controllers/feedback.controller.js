import db from "../models/index.js";
import normalizeFeedback from "../utils/normalize.js";

import path from "path";
import { predictImage } from "../utils/predictModel.js";
import fs from "fs";
import normalizeBoundingBox from "../utils/normalizeBoudingBox.js";

const Feedback = db.feedback;

export const createFeedback = (req, res) => {
  const { agree, annotation, comment, boundingBoxes, imageWidth, imageHeight } =
    req.body;

  const normalizedBoxes = boundingBoxes.map((box) =>
    normalizeBoundingBox(box, imageWidth, imageHeight)
  );

  const normalizedFeedback = {
    agree: agree ? 1 : 0,
    annotation: annotation ? annotation.toLowerCase().trim() : "",
    comment: comment ? comment.toLowerCase().trim() : "",
    boundingBoxes: normalizedBoxes,
  };

  Feedback.create(normalizedFeedback)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const createPrediction = async (req, res) => {
  try {
    if (!req.file) throw new Error("No file uploaded");

    const imagePath = path.resolve(req.file.path);
    console.log("File path:", imagePath);
    if (!fs.existsSync(imagePath)) {
      throw new Error("File not found. Upload might not have completed.");
    }

    const predictions = await predictImage(imagePath);
    res.json({ predictions });
  } catch (error) {
    console.error("Image upload/prediction error:", error);
    res.status(500).send({ message: error.message });
  }
};

export const saveAnnotations = async (req, res) => {
  const { filename, boxes, agree, annotation, comment } = req.body;

  try {
    const feedback = await Feedback.create({
      filename,
      boundingBoxes: boxes,
      agree: agree || false,
      annotation: annotation || "",
      comment: comment || "",
    });

    res
      .status(201)
      .json({ message: "Annotations saved successfully!", feedback });
  } catch (error) {
    console.error("Error saving annotations:", error);
    res.status(500).json({ message: "Error saving annotations." });
  }
};

export const testDatabase = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res
      .status(200)
      .send("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send("Database connection failed.");
  }
};
