import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/tasksSlice";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function TaskManagement({
  tasks = [],
  onAddTask,
  onDeleteTask,
  onToggleStatus,
  taskToEdit,
  onStartEdit,
  onUpdateTask,
}) {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks?.filter || "All");
  const theme = useSelector((state) => state.settings?.theme || "Light");

  const textColor = theme === "Dark" ? "#f8fafc" : "#0f172a";
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = safeTasks.filter((task) => {
    if (!task) return false;
    if (currentFilter === "Completed") return task.status === "Completed";
    if (currentFilter === "Pending") return task.status === "Pending";
    return true;
  });

  return (
    <div style={{ flex: 1, padding: "30px", boxSizing: "border-box", width: "100%", color: textColor }}>
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold", color: textColor }}>
          Task Management
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: theme === "Dark" ? "#94a3b8" : "#64748b" }}>
          Create, assign, and manage your project tasks efficiently.
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["All", "Pending", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => dispatch(setFilter(status))}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: currentFilter === status ? "#2563eb" : (theme === "Dark" ? "#334155" : "#e2e8f0"),
              color: currentFilter === status ? "white" : textColor,
              fontWeight: "600",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <TaskForm
        onAddTask={onAddTask}
        taskToEdit={taskToEdit}
        onUpdateTask={onUpdateTask}
      />

      <TaskList
        tasks={filteredTasks}
        onDeleteTask={onDeleteTask}
        onToggleStatus={onToggleStatus}
        onStartEdit={onStartEdit}
      />
    </div>
  );
}

export default TaskManagement;