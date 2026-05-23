import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { BookOpen, Copy, Loader2 } from "lucide-react";

export default function TestGeneration({ role }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [framework, setFramework] = useState("");
  const [testType, setTestType] = useState("");
  const [testSubType, setTestSubType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role === "developer") {
      setFramework("pytest");
      setTestType("unit");
    } else if (role === "qa") {
      setFramework("selenium");
      setTestSubType("ui");
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
          Authorization: `Bearer ${token}`,
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
      
    } catch (error) {
      setOutput(`Error generating ${role === "developer" ? "test" : "strategy"}`);
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      {children}
    </div>
  );


  return (
    <DashboardLayout role={role}>
      <div className="min-h-screen bg-gray-50 px-6 py-8">

        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
            <BookOpen className="text-[#1A3FFF]" />
            Test Generation
          </h1>
          <p className="text-gray-500 mt-1">
            Convert requirements into clean, runnable test cases
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">

       
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Describe Requirement</h2>
              <p className="text-sm text-gray-500">
                Write or paste your feature description
              </p>
            </div>

            <div className="p-6">
              <textarea
                className="w-full h-56 p-4 rounded-xl bg-gray-50 focus:bg-white border border-gray-100 focus:border-blue-200 outline-none resize-none transition"
                placeholder={
                  role === "developer"
                    ? "Enter code or requirement..."
                    : "Describe UI / feature flow..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <div className="mt-5 space-y-4">

                {role === "developer" && (
                  <div className="flex gap-3">
                    {["unit", "integration"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTestType(t)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                          testType === t
                            ? "bg-[#1A3FFF] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {t === "unit" ? "Unit Tests" : "Integration"}
                      </button>
                    ))}
                  </div>
                )}

                {role === "qa" && (
                  <div className="flex gap-3">
                    {["ui", "workflow"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTestSubType(t)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                          testSubType === t
                            ? "bg-[#1A3FFF] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}

                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-200 outline-none"
                >
                  {role === "developer" ? (
                    <>
                      <option value="pytest">Pytest</option>
                      <option value="jest">Jest</option>
                      <option value="junit">JUnit</option>
                    </>
                  ) : (
                    <>
                      <option value="selenium">Selenium</option>
                      <option value="cypress">Cypress</option>
                      <option value="playwright">Playwright</option>
                    </>
                  )}
                </select>

                <button
                  onClick={handleGenerate}
                  className="w-full bg-[#1A3FFF] text-white py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Output</h2>

              {output && (
                <button
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <Copy size={18} />
                </button>
              )}
            </div>

            <div className="p-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-sm min-h-[260px] overflow-auto whitespace-pre-wrap">
                {output || "Generated output will appear here..."}
              </pre>
            </div>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}





