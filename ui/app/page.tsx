"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";
import { DashboardProvider, useDashboard } from "./DashboardContext";
import { ModuleRenderer } from "./ModuleRenderer";

function Dashboard() {
  const { modules, addModule, removeModule, updateModule } = useDashboard();

  // Register CopilotKit UI actions
  useCopilotAction({
    name: "addModule",
    description: `
      Add a chart module to the dashboard UI.
      - 'type' must be one of: 'lineChart', 'barChart'.
      - 'data' must be an array of objects like: { date: '2024-05-01', price: 123.45 }.
      - 'title' is an optional string for the chart title.
      Example:
        {
          type: "lineChart",
          data: [
            { date: "2024-05-01", price: 123.45 },
            { date: "2024-05-02", price: 125.67 }
          ],
          title: "AAPL Stock Price"
        }
    `,
    parameters: [
      { name: "type", type: "string", required: true },
      { name: "data", type: "object", required: true },
      { name: "title", type: "string", required: false },
    ],
    handler: ({ type, data, title }) => {
      console.log("addModule called from agent:", { type, data, title });
      addModule(type as any, data, title);
    },
  });

  useCopilotAction({
    name: "removeModule",
    description: `
      Remove a module from the dashboard UI.
      - 'id' must be the string id of the module to remove.
      Example:
        { id: "abc123" }
    `,
    parameters: [{ name: "id", type: "string", required: true }],
    handler: ({ id }) => {
      console.log("removeModule called from agent:", { id });
      removeModule(id);
    },
  });

  useCopilotAction({
    name: "updateModule",
    description: `
      Update a module in the dashboard UI.
      - 'id' must be the string id of the module to update.
      - 'updates' must be an object with the fields to update (e.g., title, data).
      Example:
        { id: "abc123", updates: { title: "New Title" } }
    `,
    parameters: [
      { name: "id", type: "string", required: true },
      { name: "updates", type: "object", required: true },
    ],
    handler: ({ id, updates }) => {
      console.log("updateModule called from agent:", { id, updates });
      updateModule(id, updates);
    },
  });

  // Example: Simulate agent adding a TSLA line chart
  const handleAddTSLA = async () => {
    const res = await fetch(
      "http://localhost:4000/api/stock-history?ticker=TSLA"
    );
    const { data } = await res.json();
    addModule("lineChart", data, "TSLA Stock History");
  };

  return (
    <div>
      <h1>Financial Dashboard</h1>
      <button onClick={handleAddTSLA} style={{ marginBottom: 16 }}>
        Add TSLA Chart (Simulate Agent)
      </button>
      <div>
        {modules.map((mod) => (
          <ModuleRenderer key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <DashboardProvider>
      <Dashboard />
      <CopilotSidebar
        defaultOpen={true}
        labels={{
          title: "Popup Assistant",
          initial: "Hi! I'm connected to an agent. How can I help?",
        }}
      />
    </DashboardProvider>
  );
}

function YourMainContent() {
  const [backgroundColor, setBackgroundColor] = useState("#ADD8E6");

  // Render a greeting in the chat
  useCopilotAction({
    name: "greetUser",
    available: "remote", // make this available only to the agent
    parameters: [
      {
        name: "name",
        description: "The name of the user to greet.",
      },
    ],
    render: ({ args }) => {
      return (
        <div className="text-lg font-bold bg-blue-500 text-white p-2 rounded-xl text-center">
          Hello, {args.name}!
        </div>
      );
    },
  });

  // Action for setting the background color
  useCopilotAction({
    name: "setBackgroundColor",
    available: "remote", // make this available only to the agent
    parameters: [
      {
        name: "backgroundColor",
        description:
          "The background color to set. Make sure to pick nice colors.",
      },
    ],
    handler({ backgroundColor }) {
      setBackgroundColor(backgroundColor);
    },
  });

  // Render the main content
  return (
    <div
      style={{ backgroundColor }}
      className="h-screen w-screen flex justify-center items-center flex-col"
    >
      <h1 className="bg-blue-500 p-10 rounded-xl text-white text-4xl">
        Your main content
      </h1>
    </div>
  );
}
