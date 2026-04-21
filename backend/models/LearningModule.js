import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const LearningModule = sequelize.define(
  "LearningModule",
  {
    moduleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prerequisiteModuleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    topics: {
      type: DataTypes.JSON, // Array of topic strings
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "learning_modules",
    timestamps: true,
  }
);

export default LearningModule;