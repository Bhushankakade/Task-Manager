import { useState } from "react";
import api from "../api/axios";

export default function TaskForm({ onTaskAdded }) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");
    const res = await api.post("/tasks", form);
    onTaskAdded(res.data);
    setForm({ title: "", description: "" });
  };

  return (
    <div className="task-form-card">
      <h2>New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task title *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="task-form-row">
          <input
            type="text"
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">
            + Add
          </button>
        </div>
      </form>
    </div>
  );
}
