import React from "react";

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    "Dashboard",
    "Task Management",
    "Kanban",
    "Team Management",
    "ReduxTest",
    "Settings",
  ];

  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "#38bdf8" }}>
        TaskFlow
      </h2>

      {menuItems.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            padding: "12px 16px",
            textAlign: "left",
            backgroundColor: activeTab === tab ? "#2563eb" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
            transition: "background 0.2s",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
