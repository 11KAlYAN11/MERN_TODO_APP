const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, dueDate } = req.body; // Include dueDate
        const task = new Task({ title, dueDate });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an existing task
router.put('/:id', async (req, res) => {
    try {
        const { title, completed, dueDate } = req.body; // Include dueDate
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, completed, dueDate },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const filter = req.query.filter || 'all';
        let tasks;
        if (filter === 'active') {
            tasks = await Task.find({ completed: false });
        } else if (filter === 'completed') {
            tasks = await Task.find({ completed: true });
        } else {
            tasks = await Task.find();
        }
        res.json(tasks); // Ensure dueDate is included in the response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get upcoming tasks
router.get('/upcoming', async (req, res) => {
    try {
        const today = new Date();
        const tasks = await Task.find({ dueDate: { $gte: today } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;