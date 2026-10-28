import React from "react";

function KanbanColumn({ title, tasks, onMoveTask, statusKey }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "280px",
        backgroundColor: "#f1f5f9",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* Column ki Heading */}
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "16px",
          color: "#0f172a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{title}</span>
        {/* Total tasks count badge */}
        <span
          style={{
            backgroundColor: "#cbd5e1",
            color: "#0f172a",
            fontSize: "12px",
            padding: "2px 8px",
            borderRadius: "12px",
          }}
        >
          {tasks.length}
        </span>
      </h3>

      {/* Tasks Cards Container */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {tasks.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#64748b", textAlign: "center", margin: "20px 0" }}>
            No tasks in this stage
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: "white",
                padding: "14px",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Task Title */}
              <div style={{ fontWeight: "600", fontSize: "14px", color: "#0f172a", marginBottom: "6px" }}>
                {task.title}
              </div>

              {/* Task Description */}
              {task.description && (
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "10px" }}>
                  {task.description}
                </div>
              )}

              {/* Task Footer (Priority & Move Action) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: task.priority === "High" ? "#fee2e2" : "#fef9c3",
                    color: task.priority === "High" ? "#dc2626" : "#ca8a04",
                    fontWeight: "600",
                  }}
                >
                  {task.priority || "Medium"}
                </span>

                {/* Move status buttons */}
                <div style={{ display: "flex", gap: "4px" }}>
                  {statusKey !== "Pending" && (
                    <button
                      onClick={() => onMoveTask(task.id, "Pending")}
                      style={{ fontSize: "11px", padding: "3px 6px", cursor: "pointer", background: "#e2e8f0", border: "none", borderRadius: "4px" }}
                    >
                      ⬅️ To Do
                    </button>
                  )}
                  {statusKey !== "In Progress" && (
                    <button
                      onClick={() => onMoveTask(task.id, "In Progress")}
                      style={{ fontSize: "11px", padding: "3px 6px", cursor: "pointer", background: "#dbeafe", color: "#2563eb", border: "none", borderRadius: "4px" }}
                    >
                      In Progress 🔄
                    </button>
                  )}
                  {statusKey !== "Completed" && (
                    <button
                      onClick={() => onMoveTask(task.id, "Completed")}
                      style={{ fontSize: "11px", padding: "3px 6px", cursor: "pointer", background: "#dcfce7", color: "#16a34a", border: "none", borderRadius: "4px" }}
                    >
                      Done ✅
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;