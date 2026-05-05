const express = require("express");
const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  markComplete,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, markComplete);
router.delete("/:id", protect, deleteTask);

module.exports = router;
