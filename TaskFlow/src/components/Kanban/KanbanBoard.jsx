import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import KanbanColumn from "./KanbanColumn";

function KanbanBoard({ tasks = [], onUpdateTaskStatus }) {
  const theme = useSelector((state) => state.settings?.theme || "Light");

  const textColor = theme === "Dark" ? "#f8fafc" : "#0f172a";
  const cardBg = theme === "Dark" ? "#1e293b" : "#ffffff";
  const borderColor = theme === "Dark" ? "#334155" : "#e2e8f0";

  // 1. Map Demonstration: Fast ID-to-Task lookup map banana
  const taskMap = useMemo(() => {
    const map = new Map();
    tasks.forEach((t) => map.set(t.id, t));
    return map;
  }, [tasks]);

  // 2. Set Demonstration: Unique assignees collect karna
  const uniqueAssignees = useMemo(() => {
    const assignees = new Set();
    tasks.forEach((t) => {
      if (t.assignee) assignees.add(t.assignee);
    });
    return Array.from(assignees);
  }, [tasks]);

  // 3. useMemo for Array Transformations & Filtering (Performance optimization)
  const { pendingTasks, inProgressTasks, completedTasks } = useMemo(() => {
    return {
      pendingTasks: tasks.filter((t) => t.status === "Pending" || !t.status),
      inProgressTasks: tasks.filter((t) => t.status === "In Progress"),
      completedTasks: tasks.filter((t) => t.status === "Completed"),
    };
  }, [tasks]);

  return (
    <div style={{ flex: 1, padding: "30px", boxSizing: "border-box", width: "100%", color: textColor }}>
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold", color: textColor }}>
          Kanban Board
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: theme === "Dark" ? "#94a3b8" : "#64748b" }}>
          Active Assignees in Board: {uniqueAssignees.join(", ") || "None"}
        </p>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <KanbanColumn title="📌 To Do" tasks={pendingTasks} statusKey="Pending" onMoveTask={onUpdateTaskStatus} />
        <KanbanColumn title="🔄 In Progress" tasks={inProgressTasks} statusKey="In Progress" onMoveTask={onUpdateTaskStatus} />
        <KanbanColumn title="✅ Completed" tasks={completedTasks} statusKey="Completed" onMoveTask={onUpdateTaskStatus} />
      </div>
    </div>
  );
}

export default KanbanBoard;