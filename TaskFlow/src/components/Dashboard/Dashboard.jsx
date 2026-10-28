import React from "react";
import { useSelector } from "react-redux"; // 👈 useSelector import karein

function Dashboard({ tasks = [] }) {
  // 👈 Redux store se theme lena
  const theme = useSelector((state) => state.settings?.theme || "Light");

  const textColor = theme === "Dark" ? "#f8fafc" : "#0f172a";
  const cardBg = theme === "Dark" ? "#1e293b" : "#ffffff";
  const borderColor = theme === "Dark" ? "#334155" : "#e2e8f0";

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const overdueTasks = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== "Completed").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div style={{ flex: 1, padding: "30px", boxSizing: "border-box", width: "100%", color: textColor }}>
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold", color: textColor }}>
          Dashboard
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: theme === "Dark" ? "#94a3b8" : "#64748b" }}>
          Monitor your daily project tasks, pending workflows, and overall team performance.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
        {[
          { title: "TOTAL TASKS", count: totalTasks, color: "#2563eb" },
          { title: "COMPLETED", count: completedTasks, color: "#16a34a" },
          { title: "PENDING", count: pendingTasks, color: "#d97706" },
          { title: "OVERDUE", count: overdueTasks, color: "#dc2626" },
          { title: "COMPLETION", count: `${completionRate}%`, color: "#2563eb" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: cardBg,
              padding: "20px",
              borderRadius: "8px",
              border: `1px solid ${borderColor}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", fontSize: "13px", color: theme === "Dark" ? "#94a3b8" : "#64748b" }}>
              {item.title}
            </h4>
            <span style={{ fontSize: "28px", fontWeight: "bold", color: item.color }}>
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;