import { TestGeneration } from "../models/syncModels.js";
import { Op, QueryTypes } from "sequelize";

export const getStudentDashboard = async (req, res) => {
  try {
    const userID = req.user.id;

    const allTests = await TestGeneration.findAll({
      where: {
        userID: userID,
        role: "student"
      },
      order: [["createdAt", "DESC"]]
    });

    const totalSessions = allTests.length;

    let progressLevel = "Beginner";
      if (totalSessions >= 20) {
        progressLevel = "Advanced";
      } else if (totalSessions >= 10) {
        progressLevel = "Intermediate";
      }

    let lastActivity = null;
      if (allTests.length > 0) {
        lastActivity = allTests[0];
      }

    let recentLearning = [];
      for (let i = 0; i < allTests.length && i < 5; i++) {
        recentLearning.push(allTests[i]);
      }

    // most learned topic
    let topicCount = {};
    for (let i = 0; i < allTests.length; i++) {
      let topic = allTests[i].requirement;

      if (topic) {
        if (topicCount[topic]) {
          topicCount[topic] = topicCount[topic] + 1;
        } else {
          topicCount[topic] = 1;
        }
      }
    }

    let mostLearnedTopic = "N/A";
    let maxCount = 0;

    for (let key in topicCount) {
      if (topicCount[key] > maxCount) {
        maxCount = topicCount[key];
        mostLearnedTopic = key;
      }
    }

    return res.json({
      totalSessions: totalSessions,
      progressLevel: progressLevel,
      lastActivity: lastActivity,
      mostLearnedTopic: mostLearnedTopic,
      recentLearning: recentLearning
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Dashboard error"
    });
  }
};


export const getStudentLearningHistory = async (req, res) => {
  try {
    const userID = req.user.id;

    const history = await TestGeneration.findAll({
      where: {
        userID: userID,
        role: "student"
      },
      order: [["createdAt", "DESC"]]
    });

    return res.json({
      learningData: history
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error getting history"
    });
  }
};


export const getStudentProgress = async (req, res) => {
  try {
    const userID = req.user.id;

    const total = await TestGeneration.count({
      where: {
        userID: userID,
        role: "student"
      }
    });

    let level = "Beginner";

    if (total > 20) {
      level = "Advanced";
      } else if (total > 10) {
      level = "Intermediate";
    }

    return res.json({
      totalLearningSessions: total,
      progressLevel: level
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching progress"
    });
  }
};


export const getStudentProgressInsights = async (req, res) => {
  try {
    const userID = req.user.id;

    const data = await TestGeneration.findAll({
      where: {
        userID: userID,
        role: "student"
      },
      order: [["createdAt", "ASC"]]
    });

    if (data.length === 0) {
      return res.json({
        insights: {
          totalSessions: 0,
          currentStreak: 0,
          longestStreak: 0,
          weeklyAverage: 0,
          monthlyGrowth: 0,
          mostActiveDay: "N/A",
          consistencyScore: 0,
          recommendations: ["Start learning to see insights"]
        }
      });
    }

    // group by date
    let dateMap = {};

    for (let i = 0; i < data.length; i++) {
      let d = new Date(data[i].createdAt).toDateString();

      if (dateMap[d]) {
        dateMap[d] = dateMap[d] + 1;
      } else {
        dateMap[d] = 1;
      }
    }

    let dates = Object.keys(dateMap);

    // streak
    let currentStreak = 0;
    let check = new Date();

    for (let i = 0; i < 365; i++) {
      let d = check.toDateString();

      if (dateMap[d]) {
        currentStreak++;
        check.setDate(check.getDate() - 1);
      } else {
        break;
      }
    }

    // longest streak
    let longest = 0;
    let temp = 0;

    for (let i = 0; i < dates.length; i++) {
      temp++;

      let curr = new Date(dates[i]);
      let next = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

      if (!next || next - curr > 86400000) {
        if (temp > longest) {
          longest = temp;
        }
        temp = 0;
      }
    }

    // most active day
    let dayCount = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < dates.length; i++) {
      let day = new Date(dates[i]).getDay();
      dayCount[day]++;
    }

    let maxDay = 0;
    for (let i = 1; i < 7; i++) {
      if (dayCount[i] > dayCount[maxDay]) {
        maxDay = i;
      }
    }

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let recommendations = [];

    if (currentStreak === 0) {
      recommendations.push("Start learning daily");
    } else if (currentStreak < 3) {
      recommendations.push("Try to maintain streak");
    } else {
      recommendations.push("Good consistency");
    }

    return res.json({
      insights: {
        totalSessions: data.length,
        currentStreak: currentStreak,
        longestStreak: longest,
        mostActiveDay: days[maxDay],
        recommendations: recommendations
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching insights"
    });
  }
};