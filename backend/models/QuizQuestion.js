import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const QuizQuestion = sequelize.define(
  "QuizQuestion",
  {
    questionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON, // Array of strings
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.INTEGER, // Index of correct answer
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      defaultValue: 'medium',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "quiz_questions",
    timestamps: true,
  }
);

export default QuizQuestion;