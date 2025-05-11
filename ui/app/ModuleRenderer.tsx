import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { DashboardModule } from "./DashboardContext";

interface ModuleRendererProps {
  module: DashboardModule;
}

export const ModuleRenderer: React.FC<ModuleRendererProps> = ({ module }) => {
  if (module.type === "lineChart") {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <h3>{module.title}</h3>
        <ResponsiveContainer>
          <LineChart data={module.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  if (module.type === "barChart") {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <h3>{module.title}</h3>
        <ResponsiveContainer>
          <BarChart data={module.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  return null;
};
