import {User} from "./User.js";
import {TestGeneration} from "./TestGeneration.js";

User.hasMany(TestGeneration, {foreignKey:"userID"});
TestGeneration.belongsTo(User, {foreignKey:"userID"});

export {User, TestGeneration};