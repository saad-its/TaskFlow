import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TeamMemberCard from "./TeamMemberCard";

const activeMemberTracker = new WeakSet();
const memberNotesMap = new WeakMap();

function TeamManagement({ tasks = [] }) {
  const theme = useSelector((state) => state.settings?.theme || "Light");

  const textColor = theme === "Dark" ? "#f8fafc" : "#0f172a";
  const cardBg = theme === "Dark" ? "#1e293b" : "#ffffff";
  const borderColor = theme === "Dark" ? "#334155" : "#e2e8f0";
  const inputBg = theme === "Dark" ? "#0f172a" : "#ffffff";

  const [teamMembers, setTeamMembers] = useState(() => {
    const savedMembers = localStorage.getItem("taskflow_team_members");
    if (savedMembers) {
      return JSON.parse(savedMembers);
    }
    return [
      { id: 1, name: "Saad Manzoor", role: "Lead Developer" },
      { id: 2, name: "Ali Ahmed", role: "Frontend Developer" },
      { id: 3, name: "Usman Khan", role: "Backend Developer" },
    ];
  });

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [evaluationLogs, setEvaluationLogs] = useState({});

  useEffect(() => {
    localStorage.setItem("taskflow_team_members", JSON.stringify(teamMembers));
  }, [teamMembers]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember = {
      id: Date.now(),
      name: newMemberName,
      role: newMemberRole || "Developer",
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName("");
    setNewMemberRole("");
  };

  const handleInspectMember = (memberObj) => {
    activeMemberTracker.add(memberObj);
    let notes = memberNotesMap.get(memberObj) || "Good standing";
    memberNotesMap.set(
      memberObj,
      `Inspected at ${new Date().toLocaleTimeString()}\n${notes}`
    );

    // Closure demonstration
    let evaluationCount = (evaluationLogs[memberObj.id] ? parseInt(evaluationLogs[memberObj.id].replace(/[^0-9]/g, '')) : 0) + 1;
    
    setEvaluationLogs((prev) => ({
      ...prev,
      [memberObj.id]: `Evaluations: ${evaluationCount}`,
    }));
  };

  return (
    <div
      style={{
        flex: 1,
        padding: "30px",
        boxSizing: "border-box",
        width: "100%",
        color: textColor,
      }}
    >
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "bold",
            color: textColor,
          }}
        >
          Team Management & Workload
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: theme === "Dark" ? "#94a3b8" : "#64748b" }}>
          Demonstrating Reusable Components, WeakMap, WeakSet, and Closures.
        </p>
      </div>

      <form
        onSubmit={handleAddMember}
        style={{
          backgroundColor: cardBg,
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "25px",
          display: "flex",
          gap: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: `1px solid ${borderColor}`,
        }}
      >
        <input
          type="text"
          placeholder="Member Name..."
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: `1px solid ${borderColor}`,
            backgroundColor: inputBg,
            color: textColor,
            outline: "none",
          }}
        />
        <input
          type="text"
          placeholder="Role (e.g. UI Designer)..."
          value={newMemberRole}
          onChange={(e) => setNewMemberRole(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: `1px solid ${borderColor}`,
            backgroundColor: inputBg,
            color: textColor,
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Add Member
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {teamMembers.map((member) => {
          const memberTasksCount = tasks.filter(
            (t) =>
              t.assignee &&
              member.name &&
              t.assignee.trim().toLowerCase() ===
                member.name.trim().toLowerCase(),
          ).length;

          return (
            <div
              key={member.id}
              onClick={() => handleInspectMember(member)}
              style={{ cursor: "pointer" }}
            >
              <TeamMemberCard member={member} tasksCount={memberTasksCount} />
              {evaluationLogs[member.id] && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "#16a34a",
                    marginTop: "4px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {evaluationLogs[member.id]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamManagement;