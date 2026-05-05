import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length)
    return <div className="empty-state">No tasks yet. Add one above!</div>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
