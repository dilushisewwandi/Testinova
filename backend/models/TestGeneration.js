import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const TestGeneration = sequelize.define(
  "TestGeneration", 
  {
    testID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull:false,
        
    },
    generatedCode:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    requirement: {
        type: DataTypes.TEXT,
        allowNull: false, 
    },
    framework: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },
    testType: {
        type: DataTypes.STRING,
        allowNull: false,
    },    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "developer",
    },    qualityScore:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    coverageEstimate:{
        type:DataTypes.FLOAT,
        defaultValue:0,
    },
    feedback: {
        type: DataTypes.JSON,
    },
    breakdown:{
        type:DataTypes.JSON,
    }
  },
  {
    tableName: "test", 
    timestamps: true, 
  }
);

export default TestGeneration;