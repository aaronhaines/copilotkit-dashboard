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
      - 'id' (optional) is a unique string identifier for the module. If not provided, one will be generated.
      - 'type' must be one of: 'lineChart', 'barChart'.
      - 'data' must be an array of objects like: { date: '2024-05-01', price: 123.45 }.
      - 'title' is an optional string for the chart title.
      Example:
        {
          id: "abc123",
          type: "lineChart",
          data: [
            { date: "2024-05-01", price: 123.45 },
            { date: "2024-05-02", price: 125.67 }
          ],
          title: "AAPL Stock Price"
        }
    `,
    parameters: [
      { name: "id", type: "string", required: false, nullable: true },
      { name: "type", type: "string", required: true },
      { name: "data", type: "object", required: true },
      { name: "title", type: "string", required: false, nullable: true },
    ],
    handler: ({ id, type, data, title }) => {
      const moduleId = id || Math.random().toString(36).substr(2, 9);
      console.log("addModule called from agent:", {
        id: moduleId,
        type,
        data,
        title,
      });
      addModule(type as any, data, title, moduleId);
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
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      {/* Title Bar */}
      <header className="bg-gray-950 shadow-md py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Agent Dashboard
        </h1>
        {/* Placeholder for user info/logout */}
        <div className="text-sm text-gray-400">User: Alex | Logout</div>
      </header>
      <div className="flex flex-1">
        {/* Left Navigation */}
        <nav className="w-56 bg-gray-800 p-6 flex flex-col gap-6 min-h-full border-r border-gray-700">
          <div className="text-lg font-semibold text-gray-300 mb-4 tracking-wide">
            Navigation
          </div>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <span className="material-icons">dashboard</span> Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <span className="material-icons">pie_chart</span> Portfolio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <span className="material-icons">trending_up</span> Market
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <span className="material-icons">people</span> Clients
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <span className="material-icons">settings</span> Settings
              </a>
            </li>
          </ul>
        </nav>
        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <button
            onClick={handleAddTSLA}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add TSLA Chart (Simulate Agent)
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md h-full flex flex-col"
              >
                <h2 className="text-lg font-semibold text-gray-300 mb-2">
                  {mod.title}
                </h2>
                <div className="flex-1 flex items-center justify-center">
                  <ModuleRenderer module={mod} />
                </div>
              </div>
            ))}
          </div>
        </main>
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
