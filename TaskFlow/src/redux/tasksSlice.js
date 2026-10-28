import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem("taskflow_items");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  } catch (error) {
    console.error("Could not load tasks from localStorage", error);
  }
  return [
    { id: 1, title: "Learn Redux Toolkit", status: "Pending", assignee: "Saad Manzoor", priority: "Medium", dueDate: "N/A" }
  ];
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: loadTasksFromStorage(),
    teamMembers: ["Saad Manzoor", "Ali Khan", "Ahmed Raza"],
    filter: "All",
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("taskflow_items", JSON.stringify(state.items));
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      localStorage.setItem("taskflow_items", JSON.stringify(state.items));
    },
    toggleStatus: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.status = task.status === "Pending" ? "Completed" : "Pending";
        localStorage.setItem("taskflow_items", JSON.stringify(state.items));
      }
    },
    // 👈 1. Task update karne ka Reducer
    updateTask: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem("taskflow_items", JSON.stringify(state.items));
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    addTeamMember: (state, action) => {
      state.teamMembers.push(action.payload);
    },
  },
});

// 👈 2. updateTask ko export karein
export const { addTask, deleteTask, toggleStatus, updateTask, setFilter, addTeamMember } = tasksSlice.actions;
export default tasksSlice.reducer;