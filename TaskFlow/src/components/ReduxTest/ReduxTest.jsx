import React from "react";
import { useSelector } from "react-redux";

function ReduxTest() {
  const { items, teamMembers, filter } = useSelector((state) => state.tasks);
  const theme = useSelector((state) => state.settings?.theme || "Light");

  const textColor = theme === "Dark" ? "#f8fafc" : "#0f172a";
  const cardBg = theme === "Dark" ? "#1e293b" : "#ffffff";
  const borderColor = theme === "Dark" ? "#334155" : "#e2e8f0";
  const subText = theme === "Dark" ? "#94a3b8" : "#64748b";

  return (
    <div style={{ flex: 1, padding: "30px", boxSizing: "border-box", width: "100%", color: textColor }}>
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold", color: textColor }}>
          Redux Store Status
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: subText }}>
          Testing and inspecting live Redux store states and slices.
        </p>
      </div>

      <div
        style={{
          backgroundColor: cardBg,
          padding: "25px",
          borderRadius: "8px",
          border: `1px solid ${borderColor}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          textAlign: "left",
        }}
      >
        <h2 style={{ color: textColor, marginTop: 0, fontSize: "18px" }}>🧪 Store Debug View</h2>
        <p style={{ color: subText, marginBottom: "8px" }}>Current Filter: <strong style={{ color: textColor }}>{filter}</strong></p>
        <p style={{ color: subText, marginBottom: "15px" }}>Total Tasks in Store: <strong style={{ color: textColor }}>{items.length}</strong></p>
        
        <h3 style={{ marginTop: "15px", marginBottom: "8px", color: textColor, fontSize: "16px" }}>Team Members:</h3>
        <ul style={{ paddingLeft: "0", margin: 0, listStylePosition: "inside" }}>
          {teamMembers.map((member, index) => (
            <li key={index} style={{ color: subText, marginBottom: "6px" }}>{member}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReduxTest;