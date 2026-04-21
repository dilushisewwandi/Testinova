import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function GenerateUITest() {
  const [requirementText, setRequirementText] = useState("");
  const [framework, setFramework] = useState("Selenium");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:8000/generate-test",
      {
        role: "qa",
        testType: "ui",
        framework,
        requirementText,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResult(res.data.generatedTest);
  };

  return (
    <DashboardLayout role="qa">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Generate UI Test</h1>

        <textarea
          className="w-full border p-3 rounded-lg mb-4"
          rows={5}
          placeholder="Enter UI requirement..."
          value={requirementText}
          onChange={(e) => setRequirementText(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg mb-4"
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
        >
          <option>Selenium</option>
          <option>Cypress</option>
          <option>Playwright</option>
        </select>

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Generate
        </button>

        {result && (
          <pre className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            {result}
          </pre>
        )}
      </div>
    </DashboardLayout>
  );
}