import React from "react";

function TaskList({ tasks, onDeleteTask, onToggleStatus, onStartEdit }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              color: "#64748b",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <th style={{ padding: "14px 20px" }}>Task Title</th>
            <th style={{ padding: "14px 20px" }}>Assignee</th>
            <th style={{ padding: "14px 20px" }}>Priority</th>
            <th style={{ padding: "14px 20px" }}>Due Date</th>
            <th style={{ padding: "14px 20px" }}>Status</th>
            <th style={{ padding: "14px 20px", textAlign: "center" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                No tasks available. Add one above!
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task.id}
                style={{
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <td style={{ padding: "14px 20px" }}>
                  <div>
                    <div
                      style={{
                        color: "#0f172a",
                        fontWeight: "500",
                        textDecoration:
                          task.status === "Completed" ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </div>
                    {task.description && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginTop: "2px",
                        }}
                      >
                        {task.description}
                      </div>
                    )}
                  </div>
                </td>

                <td
                  style={{
                    padding: "14px 20px",
                    color: "#475569",
                    fontSize: "13px",
                  }}
                >
                  {task.assignee || "Unassigned"}
                </td>

                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      backgroundColor:
                        task.priority === "High"
                          ? "#fee2e2"
                          : task.priority === "Low"
                            ? "#f1f5f9"
                            : "#fef9c3",
                      color:
                        task.priority === "High"
                          ? "#dc2626"
                          : task.priority === "Low"
                            ? "#475569"
                            : "#ca8a04",
                      fontWeight: "600",
                    }}
                  >
                    {task.priority || "Medium"}
                  </span>
                </td>

                <td style={{ padding: "14px 20px", color: "#64748b" }}>
                  {task.dueDate || "N/A"}
                </td>

                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      backgroundColor:
                        task.status === "Completed" ? "#dcfce7" : "#fef9c3",
                      color:
                        task.status === "Completed" ? "#16a34a" : "#ca8a04",
                      fontWeight: "600",
                    }}
                  >
                    {task.status}
                  </span>
                </td>

                <td style={{ padding: "14px 20px", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => onToggleStatus(task.id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor:
                          task.status === "Completed" ? "#f1f5f9" : "#dbeafe",
                        color:
                          task.status === "Completed" ? "#475569" : "#2563eb",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {task.status === "Completed" ? "Pending" : "Complete"}
                    </button>

                    <button
                      onClick={() => onStartEdit(task)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#f3f4f6",
                        color: "#374151",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDeleteTask(task.id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
