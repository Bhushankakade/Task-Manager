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
  const [loading, setLoading] = useState(false); 
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setLoading(true); 
    try {
      const res = await api.get("/tasks", {
        params: { status: filter, page, limit: 5 },
      });
      setTasks(res.data.tasks);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
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
      <div className="dashboard-header">
        <span className="brand">TaskManager</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="user-info">Hi, {user?.name}</span>
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <TaskForm onTaskAdded={handleAdd} />

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

      {loading ? (
        <div className="empty-state">Loading tasks...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      <div className="pagination">
        <button
          className="btn btn-outline"
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Prev
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-outline"
          disabled={page * 5 >= total || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
