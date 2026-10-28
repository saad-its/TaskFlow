import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        settings: settingsReducer,
    },
});