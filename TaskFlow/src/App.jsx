import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addTask, deleteTask, toggleStatus, updateTask, } from "./redux/tasksSlice";
import { addActivity } from "./redux/settingsSlice";
import Sidebar from "./components/Common/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import TaskManagement from "./components/TaskManagement/TaskManagement";
import KanbanBoard from "./components/Kanban/KanbanBoard";
import TeamManagement from "./components/TeamManagement/TeamManagement";
import ReduxTest from "./components/ReduxTest/ReduxTest";
import Settings from "./components/Settings/Settings";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const theme = useSelector((state) => state.settings.theme);

  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      title: newTaskData.title,
      description: newTaskData.description || "",
      priority: newTaskData.priority || "Medium",
      assignee: newTaskData.assignee || "Unassigned",
      status: newTaskData.status || "Pending",
      dueDate: newTaskData.dueDate || "2026-11-01",
    };

    dispatch(addTask(newTask));
    dispatch(addActivity(`Added new task: "${newTask.title}"`));
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    dispatch(deleteTask(id));
    dispatch(
      addActivity(
        `Deleted task: "${taskToDelete ? taskToDelete.title : "Unknown"}"`,
      ),
    );
  };

  const handleStartEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleUpdateTask = (id, updatedData) => {
    dispatch(
      updateTask({
        id,
        ...updatedData,
        status:
          updatedData.status ||
          tasks.find((t) => t.id === id)?.status ||
          "Pending",
      }),
    );
    dispatch(addActivity(`Updated task: "${updatedData.title || "Task"}"`));
    setTaskToEdit(null);
  };

  const handleToggleStatus = (id) => {
    const task = tasks.find((t) => t.id === id);
    dispatch(toggleStatus(id));
    if (task) {
      const nextStatus = task.status === "Completed" ? "Pending" : "Completed";
      dispatch(addActivity(`Marked "${task.title}" as ${nextStatus}`));
    }
  };

  const handleUpdateTaskStatus = (id, newStatus) => {
    const task = tasks.find((t) => t.id === id);
    dispatch(
      updateTask({
        id,
        ...task,
        status: newStatus,
      }),
    );
    if (task) {
      dispatch(addActivity(`Moved "${task.title}" to ${newStatus}`));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: theme === "Dark" ? "#0f172a" : "#f8fafc",
        color: theme === "Dark" ? "#f8fafc" : "#0f172a",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Dashboard" && <Dashboard tasks={tasks} />}
      {activeTab === "Task Management" && (
        <TaskManagement
          tasks={tasks}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
          taskToEdit={taskToEdit}
          onStartEdit={handleStartEdit}
          onUpdateTask={handleUpdateTask}
        />
      )}
      {activeTab === "Kanban" && (
        <KanbanBoard
          tasks={tasks}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
      )}
      {activeTab === "Team Management" && <TeamManagement tasks={tasks} />}
      {activeTab === "ReduxTest" && <ReduxTest />}
      {activeTab === "Settings" && <Settings />}
    </div>
  );
}

export default App;
