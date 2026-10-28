import React, { useState, useEffect } from "react";

function TaskForm({ onAddTask, taskToEdit, onUpdateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "Medium");
      setAssignee(taskToEdit.assignee || "");
      setDueDate(taskToEdit.dueDate || "");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      onUpdateTask(taskToEdit.id, {
        title,
        description,
        priority,
        assignee,
        dueDate,
      });
    } else {
      onAddTask({
        title,
        description,
        priority,
        assignee: assignee || "Unassigned",
        dueDate: dueDate || "2026-11-01",
        status: "Pending",
      });
    }

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setAssignee("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "20px",
        backgroundColor: taskToEdit ? "#eff6ff" : "white",
        padding: "20px",
        borderRadius: "8px",
        border: taskToEdit ? "2px solid #2563eb" : "1px solid #e2e8f0",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "16px", color: "#0f172a" }}>
        {taskToEdit ? "✏️ Edit Task Mode" : "Create New Task"}
      </h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 2,
            minWidth: "200px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        />
        <input
          type="text"
          placeholder="Assignee name..."
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          style={{
            flex: 1,
            minWidth: "130px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            flex: 1,
            minWidth: "120px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            backgroundColor: "white",
          }}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            flex: 1,
            minWidth: "130px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        />
      </div>

      <textarea
        placeholder="Task description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          resize: "vertical",
          minHeight: "60px",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: taskToEdit ? "#16a34a" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          alignSelf: "flex-start",
        }}
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
