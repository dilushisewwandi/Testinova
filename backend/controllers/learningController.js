// import { TestGeneration } from "../models/syncModels.js";
// import { QueryTypes } from "sequelize";


// export const getStudentLearningHistory = async (req, res) => {
//   try {
//     const userID = req.user.id;

//     const learningData = await TestGeneration.findAll({
//       where: { userID, role: "student" },
//       order: [["createdAt", "DESC"]],
//     });

//     res.json({ learningData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching learning history" });
//   }
// };

import { TestGeneration, StudentProgress, QuizQuestion } from "../models/syncModels.js";
import { Op, QueryTypes } from "sequelize";

export const getStudentLearningHistory = async (req, res) => {
  try {
    const userID = req.user.id;

    const learningData = await TestGeneration.findAll({
      where: { userID, role: "student" },
      order: [["createdAt", "DESC"]],
    });

    res.json({ learningData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching learning history" });
  }
};
// export const getStudentProgress = async (req, res) => {
//   try {
//     const userID = req.user.id;

//     const total = await TestGeneration.count({
//       where: { userID, role: "student" }
//     });

//     res.json({
//       totalLearningSessions: total,
//       progressLevel: total > 10 ? "Advanced" : total > 5 ? "Intermediate" : "Beginner"
//     });

//     res.status(500).json({ message: "Error fetching progress" });
//   }
// };
export const getStudentProgress = async (req, res) => {
  try {
    const userID = req.user.id;

    const total = await TestGeneration.count({
      where: { userID, role: "student" }
    });

    return res.json({
      totalLearningSessions: total,
      progressLevel:
        total > 10
          ? "Advanced"
          : total > 5
          ? "Intermediate"
          : "Beginner"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching progress"
    });
  }
};

export const getStudentProgressInsights = async (req, res) => {
  try {
    const userID = req.user.id;

    const progressRecords = await StudentProgress.findAll({
      where: { userID },
      order: [["lastAccessed", "ASC"]]
    });

    if (progressRecords.length === 0) {
      return res.json({
        insights: {
          totalSessions: 0,
          currentStreak: 0,
          longestStreak: 0,
          weeklyAverage: 0,
          monthlyGrowth: 0,
          mostActiveDay: "N/A",
          consistencyScore: 0,
          recommendations: ["Start learning regularly to build momentum!"]
        }
      });
    }

    const sessionsByDate = {};
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];

    progressRecords.forEach(record => {
      const timestamp = record.lastAccessed || record.updatedAt || record.createdAt;
      const date = new Date(timestamp).toDateString();
      sessionsByDate[date] = (sessionsByDate[date] || 0) + 1;
    });

    const uniqueDates = Object.keys(sessionsByDate).sort((a, b) => new Date(a) - new Date(b));
    uniqueDates.forEach(dateStr => {
      const day = new Date(dateStr).getDay();
      dayCounts[day] += 1;
    });

    let currentStreak = 0;
    const todayDate = new Date().toDateString();
    let checkDate = new Date();

    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toDateString();
      if (sessionsByDate[dateStr]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const nextDate = i < uniqueDates.length - 1 ? new Date(uniqueDates[i + 1]) : null;

      tempStreak++;

      if (!nextDate || (nextDate - currentDate) > (24 * 60 * 60 * 1000)) {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
      }
    }

    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const recentDates = uniqueDates.filter(dateStr => new Date(dateStr) > fourWeeksAgo);
    const weeklyAverage = recentDates.length / 4;

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const thisMonthSessions = uniqueDates.filter(dateStr => {
      const date = new Date(dateStr);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    }).length;

    const lastMonthSessions = uniqueDates.filter(dateStr => {
      const date = new Date(dateStr);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    }).length;

    const monthlyGrowth = lastMonthSessions > 0 ?
      ((thisMonthSessions - lastMonthSessions) / lastMonthSessions) * 100 : 0;

    const mostActiveDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const mostActiveDay = daysOfWeek[mostActiveDayIndex] || "N/A";

    const totalDays = Math.ceil((new Date() - new Date(uniqueDates[0])) / (24 * 60 * 60 * 1000));
    const consistencyScore = Math.min(100, (uniqueDates.length / Math.max(totalDays, 1)) * 100);

    const recommendations = [];
    if (currentStreak === 0) {
      recommendations.push("Start a daily learning habit!");
    } else if (currentStreak < 3) {
      recommendations.push("Keep your streak going - you're building momentum!");
    } else {
      recommendations.push("Great consistency! Keep it up!");
    }

    if (weeklyAverage < 2) {
      recommendations.push("Try to learn at least 2 times per week for better progress.");
    }

    if (consistencyScore < 30) {
      recommendations.push("Regular practice leads to better retention. Try scheduling learning time.");
    }

    return res.json({
      insights: {
        totalSessions: uniqueDates.length,
        currentStreak,
        longestStreak,
        weeklyAverage: Math.round(weeklyAverage * 10) / 10,
        monthlyGrowth: Math.round(monthlyGrowth * 10) / 10,
        mostActiveDay,
        consistencyScore: Math.round(consistencyScore),
        recommendations
      }
    });

  } catch (error) {
    console.error("Progress insights error:", error);
    return res.status(500).json({ message: "Error fetching progress insights" });
  }
};

// Get student module progress
export const getStudentModuleProgress = async (req, res) => {
  try {
    const userID = req.user.id;

    const progress = await StudentProgress.findAll({
      where: { userID },
      order: [["moduleID", "ASC"]],
    });

    const completedModules = progress.filter(p => p.completed).map(p => p.moduleID);
    const moduleProgress = {};
    progress.forEach(p => {
      moduleProgress[p.moduleID] = p.progress;
    });

    res.json({
      completedModules,
      moduleProgress,
      detailedProgress: progress
    });
  } catch (error) {
    console.error("Module progress error:", error);
    res.status(500).json({ message: "Error fetching module progress" });
  }
};

// Helper function to save student progress (used by both updateStudentModuleProgress and submitQuiz)
const saveStudentProgress = async (userID, moduleID, moduleName, progress, completed, quizScore, timeSpent) => {
  const [progressRecord, created] = await StudentProgress.findOrCreate({
    where: { userID, moduleID },
    defaults: {
      userID,
      moduleID,
      moduleName,
      progress: progress || 0,
      completed: completed || false,
      quizScore: quizScore || 0,
      timeSpent: timeSpent || 0,
    }
  });

  if (!created) {
    // Update existing record
    await progressRecord.update({
      progress: progress !== undefined ? progress : progressRecord.progress,
      completed: completed !== undefined ? completed : progressRecord.completed,
      quizScore: quizScore !== undefined ? quizScore : progressRecord.quizScore,
      timeSpent: timeSpent !== undefined ? timeSpent : progressRecord.timeSpent,
      lastAccessed: new Date(),
    });
  }

  return progressRecord;
};

// Update student module progress
export const updateStudentModuleProgress = async (req, res) => {
  try {
    const userID = req.user.id;
    const { moduleID, moduleName, progress, completed, quizScore, timeSpent } = req.body;

    const progressRecord = await saveStudentProgress(userID, moduleID, moduleName, progress, completed, quizScore, timeSpent);

    res.json({ success: true, progress: progressRecord });
  } catch (error) {
    console.error("Update progress error:", error);
    res.status(500).json({ message: "Error updating progress" });
  }
};

// Get learning modules and metadata
export const getLearningModules = async (req, res) => {
  try {
    const modules = await LearningModule.findAll({
      where: { active: true },
      order: [["order", "ASC"]],
      attributes: ["moduleID", "title", "description", "prerequisiteModuleID", "topics"],
    });

    res.json({ modules });
  } catch (error) {
    console.error("Learning modules error:", error);
    res.status(500).json({ message: "Error fetching learning modules" });
  }
};

// Get quiz questions for a module
export const getQuizQuestions = async (req, res) => {
  try {
    const { moduleID } = req.params;

    const questions = await QuizQuestion.findAll({
      where: { moduleID, active: true },
      order: [["questionID", "ASC"]],
    });

    res.json({ questions });
  } catch (error) {
    console.error("Quiz questions error:", error);
    res.status(500).json({ message: "Error fetching quiz questions" });
  }
};

// Submit quiz answers and calculate score
export const submitQuiz = async (req, res) => {
  try {
    const userID = req.user.id;
    const { moduleID, answers } = req.body; // answers: { questionID: selectedOptionIndex }

    const questions = await QuizQuestion.findAll({
      where: { moduleID, active: true },
    });

    let correctAnswers = 0;
    const results = [];

    questions.forEach(question => {
      const userAnswer = answers[question.questionID];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctAnswers++;

      results.push({
        questionID: question.questionID,
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      });
    });

    const score = (correctAnswers / questions.length) * 100;
    const completed = score >= 70;
    const progressValue = completed ? 100 : Math.round(score);

    // Save quiz score and module progress to database using helper function
    await saveStudentProgress(
      userID,
      moduleID,
      "", // moduleName - can be empty as it may already exist
      progressValue,
      completed,
      score, // quizScore
      undefined // timeSpent - keep existing
    );

    res.json({
      score,
      totalQuestions: questions.length,
      correctAnswers,
      results,
      passed: completed,
    });
  } catch (error) {
    console.error("Submit quiz error:", error);
    res.status(500).json({ message: "Error submitting quiz" });
  }
};

// Initialize default quiz questions (one-time setup)
export const initializeQuizQuestions = async (req, res) => {
  try {
    const defaultQuestions = [
      // Module 1: Testing Fundamentals
      {
        moduleID: 1,
        question: "What is the main goal of software testing?",
        options: ["Find bugs", "Write code faster", "Design user interfaces", "Create documentation"],
        correctAnswer: 0,
        explanation: "The primary goal of software testing is to identify bugs and ensure software quality.",
        difficulty: "easy",
      },
      {
        moduleID: 1,
        question: "Which type of testing checks individual components?",
        options: ["System Testing", "Integration Testing", "Unit Testing", "Acceptance Testing"],
        correctAnswer: 2,
        explanation: "Unit testing focuses on testing individual components or functions in isolation.",
        difficulty: "easy",
      },

      // Module 2: Unit Testing
      {
        moduleID: 2,
        question: "What does an assertion check in unit testing?",
        options: ["Code execution time", "Expected vs actual results", "Code style", "Memory usage"],
        correctAnswer: 1,
        explanation: "Assertions verify that the actual output matches the expected output.",
        difficulty: "medium",
      },

      // Module 3: Integration Testing
      {
        moduleID: 3,
        question: "Integration testing focuses on:",
        options: ["Single functions", "Component interactions", "User interface", "Performance"],
        correctAnswer: 1,
        explanation: "Integration testing verifies how different components work together.",
        difficulty: "medium",
      },

      // Module 4: UI/UX Testing
      {
        moduleID: 4,
        question: "What is usability testing?",
        options: ["Code performance", "User experience and ease of use", "Database queries", "Network speed"],
        correctAnswer: 1,
        explanation: "Usability testing evaluates how easy and pleasant the software is to use.",
        difficulty: "medium",
      },
    ];

    for (const question of defaultQuestions) {
      await QuizQuestion.findOrCreate({
        where: { moduleID: question.moduleID, question: question.question },
        defaults: question,
      });
    }

    res.json({ message: "Quiz questions initialized successfully" });
  } catch (error) {
    console.error("Initialize quiz error:", error);
    res.status(500).json({ message: "Error initializing quiz questions" });
  }
};


export const getStudentDashboard = async (req, res) => {
  try {
    const userID = req.user.id;

    const totalSessions = await TestGeneration.count({
      where: { userID }
    });

    // Get recent learning (last 30 days for streak calculation)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentLearning = await TestGeneration.findAll({
      where: {
        userID,
        createdAt: {
          [Op.gte]: thirtyDaysAgo
        }
      },
      order: [["createdAt", "DESC"]],
      limit: 50 // Enough for streak calculation
    });

    const lastActivity = await TestGeneration.findOne({
      where: { userID },
      order: [["createdAt", "DESC"]]
    });

    // Calculate most learned topic
    const mostTopic = await TestGeneration.sequelize.query(
      `SELECT requirementText, COUNT(*) as count
       FROM test
       WHERE userID = :userID AND requirementText IS NOT NULL AND requirementText != ''
       GROUP BY requirementText
       ORDER BY count DESC
       LIMIT 1`,
      {
        replacements: { userID },
        type: QueryTypes.SELECT
      }
    );

    // Calculate progress level with more nuance
    let progressLevel = "Beginner";
    if (totalSessions >= 20) {
      progressLevel = "Advanced";
    } else if (totalSessions >= 10) {
      progressLevel = "Intermediate";
    }

    return res.json({
      totalSessions,
      progressLevel,
      lastActivity,
      mostLearnedTopic: mostTopic[0]?.requirementText || "N/A",
      recentLearning: recentLearning.slice(0, 5) // Only return last 5 for dashboard
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      message: "Dashboard backend error",
      error: error.message
    });
  }
};