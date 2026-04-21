import {User} from "./User.js";
import {TestGeneration} from "./TestGeneration.js";
import {StudentProgress} from "./StudentProgress.js";
import {QuizQuestion} from "./QuizQuestion.js";
import {LearningModule} from "./LearningModule.js";

User.hasMany(TestGeneration, {foreignKey:"userID"});
TestGeneration.belongsTo(User, {foreignKey:"userID"});

User.hasMany(StudentProgress, {foreignKey:"userID"});
StudentProgress.belongsTo(User, {foreignKey:"userID"});

LearningModule.hasMany(QuizQuestion, {foreignKey:"moduleID"});
QuizQuestion.belongsTo(LearningModule, {foreignKey:"moduleID"});

LearningModule.hasMany(StudentProgress, {foreignKey:"moduleID"});
StudentProgress.belongsTo(LearningModule, {foreignKey:"moduleID"});

export {User, TestGeneration, StudentProgress, QuizQuestion, LearningModule};