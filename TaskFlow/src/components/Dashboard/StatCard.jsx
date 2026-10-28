import React from "react";

function StatCard({ title, count, bgColor, textColor }) {
  return (
    <div
      style={{
        backgroundColor: bgColor || "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        flex: "1",
        minWidth: "160px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid #e2e8f0",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "12px",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "0",
          fontSize: "26px",
          fontWeight: "bold",
          color: textColor || "#0f172a",
        }}
      >
        {count}
      </p>
    </div>
  );
}

export default StatCard;