import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const StudentProgress = sequelize.define(
  "StudentProgress",
  {
    progressID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moduleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0, // 0-100
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    quizScore: {
      type: DataTypes.FLOAT,
      defaultValue: 0, // 0-100
    },
    quizAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    timeSpent: {
      type: DataTypes.INTEGER, // in minutes
      defaultValue: 0,
    },
    lastAccessed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "student_progress",
    timestamps: true,
  }
);

export default StudentProgress;