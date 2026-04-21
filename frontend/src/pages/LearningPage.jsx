import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  BookOpen,
  Loader2,
  Lightbulb,
  Target,
  Code,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LearningPage() {
  const [input, setInput] = useState("");
  const [parsedExplanation, setParsedExplanation] = useState(null);
  const [rawOutput, setRawOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const parseStudentExplanation = (text) => {
    const sections = {
      requirementUnderstanding: "",
      testingConcepts: "",
      stepByStepApproach: "",
      practicalExamples: "",
      bestPractices: "",
    };

    const lines = text.split("\n");
    let currentSection = null;

    for (const line of lines) {
      const lower = line.toLowerCase();

      if (lower.includes("requirement understanding")) {
        currentSection = "requirementUnderstanding";
        continue;
      } else if (lower.includes("testing concepts introduction") || lower.includes("testing concept")) {
        currentSection = "testingConcepts";
        continue;
      } else if (lower.includes("step-by-step testing approach") || lower.includes("step-by-step") || lower.includes("approach")) {
        currentSection = "stepByStepApproach";
        continue;
      } else if (lower.includes("practical examples") || lower.includes("example")) {
        currentSection = "practicalExamples";
        continue;
      } else if (lower.includes("best practices") || lower.includes("learning tips") || lower.includes("best practice") || lower.includes("tip")) {
        currentSection = "bestPractices";
        continue;
      }

      if (currentSection) {
        sections[currentSection] += line + "\n";
      }
    }

    return sections;
  };

  const handleLearn = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/tests/generate",
        {
          requirementText: input,
          role: "student",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.generatedCode) {
        const parsed = parseStudentExplanation(data.generatedCode);
        setParsedExplanation(parsed);
        setRawOutput(data.generatedCode);
      }
    } catch (error) {
      console.error("Learning error:", error.response?.data || error.message);
      setParsedExplanation({ error: "Failed to generate learning content. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="text-[#1A3FFF]" size={32} />
          Learn Testing Concepts
        </h1>
        <p className="text-gray-500 mt-2">
          Master software testing fundamentals with structured explanations and examples.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">What would you like to learn?</h2>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-[#1A3FFF] outline-none"
            placeholder="Example: Explain how to test a login form..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleLearn}
            disabled={loading || !input.trim()}
            className="mt-6 w-full bg-[#1A3FFF] text-white py-3 rounded-xl shadow hover:scale-105 transition duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Generating...
              </>
            ) : (
              <>
                <Lightbulb size={18} />
                Learn Concepts
              </>
            )}
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">Your Learning Experience</h2>

          {parsedExplanation ? (
            parsedExplanation.error ? (
              <div className="text-center py-12 text-red-500">
                <p>{parsedExplanation.error}</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[500px] overflow-y-auto">
                {parsedExplanation.requirementUnderstanding && (
                  <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Target size={16} />
                      Requirement Understanding
                    </h3>
                    <p className="text-blue-700 whitespace-pre-wrap">
                      {parsedExplanation.requirementUnderstanding.trim()}
                    </p>
                  </div>
                )}

                {parsedExplanation.testingConcepts && (
                  <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Lightbulb size={16} />
                      Testing Concepts
                    </h3>
                    <p className="text-green-700 whitespace-pre-wrap">
                      {parsedExplanation.testingConcepts.trim()}
                    </p>
                  </div>
                )}

                {parsedExplanation.stepByStepApproach && (
                  <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                    <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <ArrowRight size={16} />
                      Step-by-Step Approach
                    </h3>
                    <p className="text-purple-700 whitespace-pre-wrap">
                      {parsedExplanation.stepByStepApproach.trim()}
                    </p>
                  </div>
                )}

                {parsedExplanation.practicalExamples && (
                  <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
                    <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <Code size={16} />
                      Practical Examples
                    </h3>
                    <pre className="bg-gray-800 text-green-400 p-3 rounded-lg text-sm whitespace-pre-wrap overflow-x-auto">
                      {parsedExplanation.practicalExamples.trim()}
                    </pre>
                  </div>
                )}

                {parsedExplanation.bestPractices && (
                  <div className="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500">
                    <h3 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Best Practices
                    </h3>
                    <p className="text-indigo-700 whitespace-pre-wrap">
                      {parsedExplanation.bestPractices.trim()}
                    </p>
                  </div>
                )}

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-semibold mb-2">Full Output</h3>
                  <pre className="text-sm whitespace-pre-wrap">{rawOutput}</pre>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-12 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Enter a requirement to start learning.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
