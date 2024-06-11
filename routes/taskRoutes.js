const express = require("express");
const { check } = require("express-validator");
const {createTask, getTasks, getTaskById, updateTask, deleteTask} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(
    protect,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
    createTask
  )
  .get(protect, getTasks);

router
  .route("/:id")
  .get(protect, getTaskById)
  .put(
    protect,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
    updateTask
  )
  .delete(protect, deleteTask);

module.exports = router;
