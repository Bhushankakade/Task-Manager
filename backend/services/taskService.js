const Task = require("../models/Task");

const createTask = (data) => Task.create(data);

const getAllTasks = (userId, { status, page = 1, limit = 10 }) => {
  const filter = { user: userId };

  if (status) {
    filter.status = status;
  }

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  return Task.find(filter)
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);
};

const countTasks = (userId, status) => {
  const filter = { user: userId };
  if (status) {
    filter.status = status;
  }
  return Task.countDocuments(filter);
};

const markComplete = (taskId, userId) =>
  Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    { status: "completed" },
    { new: true },
  );

const deleteTask = (taskId, userId) =>
  Task.findOneAndDelete({ _id: taskId, user: userId });

module.exports = {
  createTask,
  getAllTasks,
  countTasks,
  markComplete,
  deleteTask,
};
