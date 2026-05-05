const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const task = await taskService.createTask({
      title,
      description,
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  const { status, page, limit } = req.query;
  try {
    const tasks = await taskService.getAllTasks(req.user.id, {
      status,
      page,
      limit,
    });
    const total = await taskService.countTasks(req.user.id, status);
    res.json({ tasks, total, page: Number(page) || 1 });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const markComplete = async (req, res) => {
  try {
    const task = await taskService.markComplete(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  markComplete,
  deleteTask,
};
