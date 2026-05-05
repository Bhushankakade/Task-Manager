import api from "../api/axios";

export default function TaskCard({ task, onUpdate, onDelete }) {
  const handleComplete = async () => {
    const res = await api.patch(`/tasks/${task._id}`);
    onUpdate(res.data);
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${task._id}`);
    onDelete(task._id);
  };

  return (
    <div
      className={`task-card ${task.status === "completed" ? "completed" : ""}`}
    >
      <div className="task-body">
        <p className="task-title">{task.title}</p>
        {task.description && <p className="task-desc">{task.description}</p>}
        <div className="task-meta">
          <span className={`badge badge-${task.status}`}>{task.status}</span>
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="task-actions">
        {task.status === "pending" && (
          <button className="btn btn-success" onClick={handleComplete}>
            ✓ Done
          </button>
        )}
        <button className="btn btn-danger" onClick={handleDelete}>
          ✕
        </button>
      </div>
    </div>
  );
}
