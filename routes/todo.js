const express = require("express");
const Todo = require("../model/todo");
const router = express.Router();

router.post("/todos", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
  });
  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/todos/completed", async (req, res) => {
  try {
    const todos = await Todo.find({
      completed: req.query.completed === "true" ? true : false,
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    } else {
      res.json({ message: "Todo deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    if (id) {
      const todo = await Todo.findByIdAndUpdate(id, updatedData, { new: true });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      } else {
        res.json(todo);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    if (id) {
      const todo = await Todo.findByIdAndUpdate(id, updatedData, { new: true });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      } else {
        res.json(todo);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
