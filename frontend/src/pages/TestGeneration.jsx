import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Copy, Loader2, Download, BookOpen } from "lucide-react";

export default function TestGeneration({ role }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [framework, setFramework] = useState("");
  const [testType, setTestType] = useState("");
  const [testSubType, setTestSubType] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [currentTestId, setCurrentTestId] = useState(null);
  const [exportFramework, setExportFramework] = useState("");

  useEffect(() => {
    if (role === "developer") {
      setFramework("pytest");
      setTestType("unit");
      setExportFramework("jest");
    } else if (role === "qa") {
      setFramework("selenium");
      setTestSubType("ui");
      setExportFramework("selenium");
    }
  }, [role]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tests/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          requirementText: input,
          role,
          framework,
          ...(role === "developer" && { testType }),
          ...(role === "qa" && { testSubType }),
        }),
      });

      const data = await response.json();
      setOutput(data.generatedCode);
      setCurrentTestId(data.id);
    } catch (error) {
      console.error(error);
      setOutput(`Error generating ${role === "developer" ? "test" : "strategy"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!currentTestId || !exportFramework) {
      alert("Please generate a test first and select export framework");
      return;
    }

    try {
      setExporting(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tests/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          testId: currentTestId,
          targetFramework: exportFramework,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Export failed");
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${role}_test_${new Date().toISOString().split("T")[0]}.${getFileExtension(exportFramework)}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error("Export error:", error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setExporting(false);
    }
  };

  const getFileExtension = (framework) => {
    const extensions = {
      jest: "js",
      cypress: "js",
      playwright: "js",
      pytest: "py",
      selenium: "py",
      junit: "java",
    };
    return extensions[framework] || "txt";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <DashboardLayout role={role}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          {role === "developer" 
            ? `Generate ${testType === "integration" ? "Integration" : "Unit"} Tests` 
            : `Generate ${testSubType === "workflow" ? "Workflow" : "UI"} Testing Strategy`}
        </h1>
        <p className="text-gray-500 mt-2">
          {role === "developer"
            ? "Convert natural language requirements into runnable test code."
            : "Get comprehensive testing strategies and scenarios for UI automation."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Input Section */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">
            {role === "developer" ? "Code / Requirement" : "Feature / UI Specification"}
          </h2>

          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-[#1A3FFF] outline-none"
            placeholder={role === "developer" 
              ? "Paste your code or describe the requirement..." 
              : "Describe the feature, user flow, or UI component..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Test Type Selector (Developer Only) */}
          {role === "developer" && (
            <div className="mt-6">
              <label className="text-sm text-gray-600">
                Test Type
              </label>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setTestType("unit")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    testType === "unit"
                      ? "bg-[#1A3FFF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Unit Tests
                </button>
                <button
                  onClick={() => setTestType("integration")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    testType === "integration"
                      ? "bg-[#1A3FFF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Integration Tests
                </button>
              </div>
            </div>
          )}

          {/* Test Sub Type Selector (QA Only) */}
          {role === "qa" && (
            <div className="mt-6">
              <label className="text-sm text-gray-600">
                Test Scope
              </label>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setTestSubType("ui")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    testSubType === "ui"
                      ? "bg-[#1A3FFF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  UI Tests
                </button>
                <button
                  onClick={() => setTestSubType("workflow")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    testSubType === "workflow"
                      ? "bg-[#1A3FFF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Workflow Tests
                </button>
              </div>
            </div>
          )}

          {/* Framework Selector */}
          <div className="mt-6">
            <label className="text-sm text-gray-600">
              Select Framework
            </label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3FFF] outline-none"
            >
              {role === "developer" ? (
                <>
                  <option value="pytest">Pytest (Python)</option>
                  <option value="jest">Jest (JavaScript)</option>
                  <option value="junit">JUnit (Java)</option>
                </>
              ) : (
                <>
                  <option value="selenium">Selenium</option>
                  <option value="cypress">Cypress</option>
                  <option value="playwright">Playwright</option>
                </>
              )}
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="mt-6 w-full bg-gradient-to-r from-[#1A3FFF] to-indigo-500 text-white py-3 rounded-xl shadow hover:scale-105 transition duration-300 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                {role === "developer" ? "Generating Tests..." : "Generating Strategy..."}
              </>
            ) : (
              role === "developer" ? "Generate Test Code" : "Generate Strategy"
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white p-8 rounded-2xl shadow-md relative">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            {role === "developer" ? (
              "Generated Test Cases"
            ) : (
              "Testing Strategy & Scenarios"
            )}
          </h2>

          {output && (
            <button
              onClick={copyToClipboard}
              className="absolute top-8 right-8 text-gray-500 hover:text-[#1A3FFF]"
            >
              <Copy size={18} />
            </button>
          )}

          {/* Student Structured Learning Display */}
          {role === "student" ? (
            <div className="text-center py-12 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Enter a requirement above and click "Learn & Practice" to get a structured learning experience!</p>
            </div>
          ) : (
            // Developer/QA code display
            <pre className="bg-[#0B1020] text-white rounded-xl p-4 h-80 overflow-auto text-sm whitespace-pre-wrap break-words">
              {output || (role === "developer" ? "// Generated test cases will appear here..." : "// Testing strategy and scenarios will appear here...")}
            </pre>
          )}

          {/* Export Section - Only show for developer/QA, not students */}
          {output && role !== "student" && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Download size={16} />
                Export Test
              </h3>
              
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                  Export Framework
                </label>
                <select
                  value={exportFramework}
                  onChange={(e) => setExportFramework(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3FFF] outline-none"
                >
                  <option value="jest">Jest (JavaScript)</option>
                  <option value="pytest">Pytest (Python)</option>
                  <option value="junit">JUnit (Java)</option>
                  <option value="selenium">Selenium (Python)</option>
                  <option value="cypress">Cypress (JavaScript)</option>
                  <option value="playwright">Playwright (JavaScript)</option>
                </select>
              </div>

              <button
                onClick={handleExport}
                disabled={exporting || !currentTestId}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 transition duration-300"
              >
                {exporting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Export as .{getFileExtension(exportFramework)} file
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
