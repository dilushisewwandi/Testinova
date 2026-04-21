import React, { useState } from "react";

export default function WorkflowTestGenerationPage() {
  const [steps, setSteps] = useState([""]);
  const [workflowTest, setWorkflowTest] = useState(null);

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, ""]);

  const handleGenerate = () => {
    setWorkflowTest(`// AI Generated Workflow Test\nSteps:\n${steps.join("\n")}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Workflow Test Generation</h1>

      {steps.map((step, index) => (
        <div key={index} className="flex mb-2 gap-2">
          <span className="font-semibold">{index + 1}.</span>
          <input
            type="text"
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Describe workflow step"
          />
        </div>
      ))}

      <button
        onClick={addStep}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
      >
        Add Step
      </button>

      <button
        onClick={handleGenerate}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Generate Workflow Test
      </button>

      {workflowTest && (
        <div className="mt-6 p-4 bg-gray-100 border rounded whitespace-pre-wrap">
          {workflowTest}
        </div>
      )}
    </div>
  );
}