import React from "react";

const progressData = [
  { module: "Unit Testing", completed: true },
  { module: "Integration Testing", completed: false },
  { module: "UI Testing", completed: false },
  { module: "Test Frameworks", completed: true },
];

export default function ProgressPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Learning Progress</h1>
      <div className="space-y-4">
        {progressData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{item.module}</span>
            <span
              className={`px-2 py-1 rounded ${
                item.completed ? "bg-green-200" : "bg-gray-200"
              }`}
            >
              {item.completed ? "Completed" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}