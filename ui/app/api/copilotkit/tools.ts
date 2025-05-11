// Only UI tools are exported here
export const addModule = (type: string, data: any, title?: string) => {
  // This will be implemented to interact with DashboardContext in the frontend
  // For now, just a placeholder
  return { id: Math.random().toString(36).substr(2, 9), type, data, title };
};

export const removeModule = (id: string) => {
  // Placeholder for removing a module
  return { id };
};

export const updateModule = (id: string, updates: any) => {
  // Placeholder for updating a module
  return { id, updates };
};
