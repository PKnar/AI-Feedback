import express from "express";
import cors from "cors";
import db from "./models/index.js";
import feedbackRoutes from "./routes/feedback.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced with updated model.");
});

feedbackRoutes(app);

export default app;
