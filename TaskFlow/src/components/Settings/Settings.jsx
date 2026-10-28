import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, toggleNotifications, clearActivityLog } from "../../redux/settingsSlice";

function Settings() {
  const dispatch = useDispatch();
  const { theme, notifications, activityLog } = useSelector((state) => state.settings);

  // Theme ke mutabiq text color define karna
  const textColor = theme === "Dark" ? "#f8fafc" : "#0f172a";
  const cardBg = theme === "Dark" ? "#1e293b" : "#ffffff";
  const borderColor = theme === "Dark" ? "#334155" : "#e2e8f0";

  return (
    <div style={{ flex: 1, padding: "30px", boxSizing: "border-box", width: "100%", color: textColor }}>
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold", color: textColor }}>
          Settings & Activity History
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: theme === "Dark" ? "#94a3b8" : "#64748b" }}>
          Manage your user preferences and track recent task activities.
        </p>
      </div>

      {/* User Preferences Card */}
      <div
        style={{
          background: cardBg,
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "25px",
          border: `1px solid ${borderColor}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: textColor }}>User Preferences</h3>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <span style={{ fontSize: "14px", color: textColor }}>
            Current Theme: <strong>{theme}</strong>
          </span>
          <button
            onClick={() => dispatch(toggleTheme())}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Toggle Theme
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "14px", color: textColor }}>
            Notifications: <strong>{notifications ? "Enabled" : "Disabled"}</strong>
          </span>
          <button
            onClick={() => {
              dispatch(toggleNotifications());
              alert(notifications ? "Notifications Disabled successfully!" : "Notifications Enabled successfully!");
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: theme === "Dark" ? "#334155" : "#e2e8f0",
              color: textColor,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Toggle Notifications
          </button>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div
        style={{
          background: cardBg,
          padding: "20px",
          borderRadius: "8px",
          border: `1px solid ${borderColor}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", color: textColor }}>Recent Activity History</h3>
          {activityLog.length > 0 && (
            <button
              onClick={() => dispatch(clearActivityLog())}
              style={{
                padding: "6px 12px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              Clear History
            </button>
          )}
        </div>

        {activityLog.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "14px", fontStyle: "italic", margin: 0 }}>
            No recent activity recorded yet.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {activityLog.map((log) => (
              <li
                key={log.id}
                style={{
                  padding: "10px 0",
                  borderBottom: `1px solid ${borderColor}`,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: textColor,
                }}
              >
                <span>📝 {log.message}</span>
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>{log.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Settings;