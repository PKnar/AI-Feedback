import dbConfig from "../config/db.config.js";
import { Sequelize, DataTypes } from "sequelize";
import feedbackModel from "./feedback.model.js";

const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  pool: dbConfig.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.feedback = feedbackModel(sequelize, DataTypes);

export default db;
