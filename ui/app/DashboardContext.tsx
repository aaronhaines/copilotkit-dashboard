import React, { createContext, useContext, useState, ReactNode } from "react";

export type ModuleType = "lineChart" | "barChart";

export interface DashboardModule {
  id: string;
  type: ModuleType;
  title: string;
  data: any;
}

interface DashboardContextType {
  modules: DashboardModule[];
  addModule: (type: ModuleType, data: any, title?: string) => string;
  removeModule: (id: string) => void;
  updateModule: (id: string, updates: Partial<DashboardModule>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [modules, setModules] = useState<DashboardModule[]>([]);

  const addModule = (type: ModuleType, data: any, title?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setModules((prev) => [...prev, { id, type, title: title || type, data }]);
    return id;
  };

  const removeModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  const updateModule = (id: string, updates: Partial<DashboardModule>) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  return (
    <DashboardContext.Provider
      value={{ modules, addModule, removeModule, updateModule }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
