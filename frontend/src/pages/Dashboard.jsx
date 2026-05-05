import { useState, useEffect } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      params: { status: filter, page, limit: 5 },
    });
    setTasks(res.data.tasks);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, page]);

  const handleAdd = async () => {
    await fetchTasks();
  };
  const handleUpdate = (updated) =>
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  const handleDelete = (id) =>
    setTasks((prev) => prev.filter((t) => t._id !== id));
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <span className="brand">TaskManager</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="user-info">Hi, {user?.name}</span>
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Add Task */}
      <TaskForm onTaskAdded={handleAdd} />

      {/* Filter */}
      <div className="filter-bar">
        <label>Filter</label>
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />

      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn btn-outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Prev
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-outline"
          disabled={page * 5 >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
