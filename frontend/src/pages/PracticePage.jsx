import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  BookOpen,
  Star,
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  ArrowRight,
  Code,
  Target,
} from "lucide-react";

const fallbackModules = [
  {
    moduleID: 1,
    title: "Testing Fundamentals",
    description: "Learn the basics of software testing",
    prerequisiteModuleID: null,
    topics: ["What is Testing?", "Types of Testing", "Testing Lifecycle"],
  },
  {
    moduleID: 2,
    title: "Unit Testing",
    description: "Master unit testing concepts and practices",
    prerequisiteModuleID: 1,
    topics: ["Unit Test Structure", "Test Cases", "Assertions"],
  },
  {
    moduleID: 3,
    title: "Integration Testing",
    description: "Learn how components work together",
    prerequisiteModuleID: 2,
    topics: ["Component Integration", "API Testing", "Data Flow"],
  },
  {
    moduleID: 4,
    title: "UI/UX Testing",
    description: "Test user interfaces and experiences",
    prerequisiteModuleID: 3,
    topics: ["UI Elements", "User Flows", "Accessibility"],
  },
];

const PracticePage = () => {
  const [modules, setModules] = useState(fallbackModules);
  const [loadingModules, setLoadingModules] = useState(true);
  const [moduleError, setModuleError] = useState("");
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  const [moduleProgress, setModuleProgress] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const normalizeQuizQuestion = (question) => ({
    questionID: question.questionID || question.id,
    question: question.question,
    options: Array.isArray(question.options)
      ? question.options
      : typeof question.options === "string"
      ? JSON.parse(question.options)
      : [],
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  });

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/learning/modules", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data.modules) && res.data.modules.length > 0) {
        setModules(
          res.data.modules.map((module) => ({
            moduleID: module.moduleID,
            title: module.title,
            description: module.description,
            prerequisiteModuleID: module.prerequisiteModuleID,
            topics: Array.isArray(module.topics) ? module.topics : [],
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      setModuleError("Failed to load practice modules. Using fallback content.");
    } finally {
      setLoadingModules(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/learning/module-progress", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompletedModules(res.data.completedModules || []);
      setModuleProgress(res.data.moduleProgress || {});
    } catch (error) {
      console.error("Error fetching module progress:", error);
      setModuleError("Failed to load module progress.");
    }
  };

  useEffect(() => {
    fetchModules();
    fetchProgress();
  }, []);

  const getModuleID = (module) => module.moduleID || module.id;

  const getModuleProgress = (moduleId) => moduleProgress[moduleId] || 0;

  const isModuleUnlocked = (module) => {
    if (!module.prerequisiteModuleID) return true;
    return completedModules.includes(module.prerequisiteModuleID);
  };

  const selectModule = (index) => {
    const module = modules[index];
    if (!isModuleUnlocked(module)) return;
    setCurrentModuleIndex(index);
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const startQuiz = async () => {
    const module = modules[currentModuleIndex];
    setLoadingQuiz(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/learning/quiz/${getModuleID(module)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const questions = Array.isArray(res.data.questions)
        ? res.data.questions.map(normalizeQuizQuestion)
        : [];

      setQuizQuestions(questions);
      setShowQuiz(true);
      setQuizAnswers({});
      setQuizScore(null);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setQuizQuestions([]);
      setShowQuiz(true);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const submitQuiz = async () => {
    const module = modules[currentModuleIndex];
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/learning/quiz/submit",
        {
          moduleID: getModuleID(module),
          answers: quizAnswers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setQuizScore(res.data.score || 0);
      await fetchProgress();
      if (res.data.score !== undefined) {
        setModuleProgress((prev) => ({
          ...prev,
          [getModuleID(module)]: res.data.score,
        }));
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      let correct = 0;
      quizQuestions.forEach((question) => {
        if (quizAnswers[question.questionID] === question.correctAnswer) correct += 1;
      });

      const score = quizQuestions.length > 0 ? (correct / quizQuestions.length) * 100 : 0;
      setQuizScore(score);
      setModuleProgress((prev) => ({
        ...prev,
        [getModuleID(module)]: score,
      }));
      if (score >= 70) {
        setCompletedModules((prev) => Array.from(new Set([...prev, getModuleID(module)])));
      }
    }
  };

  const currentModule = modules[currentModuleIndex] || fallbackModules[currentModuleIndex];
  const locked = !isModuleUnlocked(currentModule);

  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="text-[#1A3FFF]" size={32} />
          Practice Modules
        </h1>
        <p className="text-gray-500 mt-2">
          Complete module quizzes and build structured testing knowledge.
        </p>
      </div>

      {moduleError && (
        <div className="mb-6 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-700">
          {moduleError}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Learning Modules</h2>
            {loadingModules ? (
              <div className="text-gray-500">Loading modules...</div>
            ) : (
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <button
                    key={getModuleID(module)}
                    onClick={() => selectModule(index)}
                    disabled={!isModuleUnlocked(module)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      currentModuleIndex === index
                        ? "border-[#1A3FFF] bg-blue-50"
                        : isModuleUnlocked(module)
                        ? "border-gray-200 hover:border-gray-300"
                        : "border-gray-100 bg-gray-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {isModuleUnlocked(module) ? (
                            <Unlock className="w-4 h-4 text-green-600" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                          <h3 className="font-semibold text-sm">{module.title}</h3>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{module.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {module.topics.map((topic) => (
                            <span key={topic} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      {completedModules.includes(getModuleID(module)) && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1A3FFF] h-2 rounded-full transition-all"
                          style={{ width: `${getModuleProgress(getModuleID(module))}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(getModuleProgress(getModuleID(module)))}% complete
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{currentModule.title}</h2>
                <p className="text-sm text-gray-500">{currentModule.description}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {Math.round(getModuleProgress(getModuleID(currentModule)))}% complete
                </div>
                {completedModules.includes(getModuleID(currentModule)) && (
                  <div className="mt-2 text-green-600 font-medium">Module passed</div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {currentModule.topics.map((topic) => (
                <div key={topic} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-semibold">{topic}</p>
                  </div>
                  <p className="text-sm text-gray-600">Review this concept before taking the quiz.</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Module Quiz</h3>
                  <p className="text-sm text-gray-500">Answer the questions to complete this module.</p>
                </div>
                <button
                  onClick={startQuiz}
                  disabled={locked}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    locked ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Start Quiz
                </button>
              </div>

              {locked ? (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                  Complete the previous module before accessing this quiz.
                </div>
              ) : showQuiz ? (
                <div className="space-y-4">
                  {loadingQuiz ? (
                    <div className="text-gray-500">Loading quiz questions...</div>
                  ) : quizQuestions.length > 0 ? (
                    quizQuestions.map((question) => (
                      <div key={question.questionID} className="bg-white rounded-xl p-4 border border-gray-200">
                        <p className="font-medium mb-3">{question.question}</p>
                        <div className="space-y-2">
                          {question.options.map((option, index) => (
                            <label key={`${question.questionID}-${index}`} className="flex items-center gap-3 text-sm">
                              <input
                                type="radio"
                                name={`question-${question.questionID}`}
                                value={index}
                                checked={quizAnswers[question.questionID] === index}
                                onChange={() => setQuizAnswers({ ...quizAnswers, [question.questionID]: index })}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl bg-white p-4 border border-dashed border-gray-200 text-sm text-gray-600">
                      No quiz questions are available for this module yet.
                    </div>
                  )}

                  {quizQuestions.length > 0 && (
                    <button
                      onClick={submitQuiz}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Submit Answers
                    </button>
                  )}
                </div>
              ) : (
                <div className="rounded-xl bg-white p-4 border border-dashed border-gray-200 text-sm text-gray-600">
                  Quiz questions are ready after you click Start Quiz.
                </div>
              )}

              {quizScore !== null && (
                <div className="mt-4 rounded-xl bg-green-50 p-4 text-green-800">
                  <p className="font-semibold">Score: {quizScore.toFixed(0)}%</p>
                  <p>{quizScore >= 70 ? "Great job!" : "Keep practicing to pass this module."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PracticePage;
