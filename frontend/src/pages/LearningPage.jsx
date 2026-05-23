import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { BookOpen, Loader2, Lightbulb } from "lucide-react";

export default function LearningPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLearn = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/tests/generate",
        { requirementText: input, role: "student" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOutput(res.data.generatedCode || "");
    } catch (err) {
      setOutput("Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="student">

      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0b1b33] flex items-center gap-3">
          <BookOpen className="text-blue-700" />
          Learn Testing Concepts
        </h1>
        <p className="text-gray-500 mt-1">
          Ask anything about software testing
        </p>
      </div>

      
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-[#0b1b33] mb-3">
          Enter Your Question
        </h2>

        <textarea
          className="w-full h-52 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Example: How to test a login page?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleLearn}
          disabled={loading}
          className="mt-4 w-full bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Generating...
            </>
          ) : (
            <>
              <Lightbulb size={18} />
              Learn Concept
            </>
          )}
        </button>
      </div>

    
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-[#0b1b33] mb-3">
          Learning Output
        </h2>

        {!output ? (
          <p className="text-gray-400 text-center py-10">
            Your explanation will appear here
          </p>
        ) : (
          <pre className="text-sm whitespace-pre-wrap text-gray-700">
            {output}
          </pre>
        )}
      </div>

    </DashboardLayout>
  );
}