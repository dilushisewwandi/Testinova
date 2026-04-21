import React, { useState } from "react";

export default function UITestGenerationPage() {
  const [selectors, setSelectors] = useState("");
  const [testScript, setTestScript] = useState(null);

  const handleGenerate = () => {
    setTestScript(`// AI Generated UI Test Script:\nSelectors: ${selectors}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">UI Test Generation</h1>

      <textarea
        rows={4}
        className="border w-full p-2 rounded mb-4"
        placeholder="Enter UI selectors or steps"
        value={selectors}
        onChange={(e) => setSelectors(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Generate UI Test Script
      </button>

      {testScript && (
        <div className="mt-6 p-4 bg-gray-100 border rounded whitespace-pre-wrap">
          {testScript}
        </div>
      )}
    </div>
  );
}
