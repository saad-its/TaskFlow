import { createSlice } from "@reduxjs/toolkit";

const loadSettingsFromStorage = () => {
  try {
    const saved = localStorage.getItem("taskflow_settings");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error loading settings", e);
  }
  return {
    theme: "Light",
    notifications: true,
    activityLog: [],
  };
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: loadSettingsFromStorage(),
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "Light" ? "Dark" : "Light";
      localStorage.setItem("taskflow_settings", JSON.stringify(state));
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
      localStorage.setItem("taskflow_settings", JSON.stringify(state));
    },
    addActivity: (state, action) => {
      const newActivity = {
        id: Date.now(),
        message: action.payload,
        time: new Date().toLocaleTimeString(),
      };
      state.activityLog.unshift(newActivity);
      localStorage.setItem("taskflow_settings", JSON.stringify(state));
    },
    clearActivityLog: (state) => {
      state.activityLog = [];
      localStorage.setItem("taskflow_settings", JSON.stringify(state));
    },
  },
});

export const { toggleTheme, toggleNotifications, addActivity, clearActivityLog } = settingsSlice.actions;
export default settingsSlice.reducer;