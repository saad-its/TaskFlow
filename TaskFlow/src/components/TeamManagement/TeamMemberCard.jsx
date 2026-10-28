import React from "react";

function TeamMemberCard({ member, tasksCount }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid #e2e8f0",
        minWidth: "250px",
        flex: "1",
      }}
    >
      {/* Member Name */}
      <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", color: "#0f172a" }}>
        {member.name}
      </h3>
      
      {/* Member Role */}
      <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#64748b" }}>
        {member.role || "Developer"}
      </p>

      {/* Workload Display */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f8fafc",
          padding: "10px 12px",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        <span style={{ color: "#334155", fontWeight: "500" }}>Workload:</span>
        <span
          style={{
            backgroundColor: tasksCount > 2 ? "#fee2e2" : "#dbeafe",
            color: tasksCount > 2 ? "#dc2626" : "#2563eb",
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {tasksCount} Tasks Assigned
        </span>
      </div>
    </div>
  );
}

export default TeamMemberCard;