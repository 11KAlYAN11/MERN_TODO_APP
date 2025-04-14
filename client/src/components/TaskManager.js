import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [editMode, setEditMode] = useState({ id: null, title: '', dueDate: '' });

  useEffect(() => {
    fetchTasks(filter);
  }, [filter]);

  const fetchTasks = async (filter) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks?filter=${filter}`);
      console.log('Fetched tasks:', response.data); // Debugging log
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', {
        title: newTask,
        dueDate: dueDate || null,
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/tasks/${id}/toggle`);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const startEditTask = (task) => {
    setEditMode({ id: task._id, title: task.title, dueDate: task.dueDate });
  };

  const saveEditTask = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${editMode.id}`, {
        title: editMode.title,
        dueDate: editMode.dueDate,
      });
      setTasks(tasks.map((task) => (task._id === editMode.id ? response.data : task)));
      setEditMode({ id: null, title: '', dueDate: '' });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const cancelEditTask = () => {
    setEditMode({ id: null, title: '', dueDate: '' });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="task-manager">
      <h2>To-Do List</h2>

      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {editMode.id && (
        <div className="edit-form">
          <h3>Edit Task</h3>
          <form onSubmit={(e) => { e.preventDefault(); saveEditTask(); }}>
            <input
              type="text"
              value={editMode.title}
              onChange={(e) => setEditMode({ ...editMode, title: e.target.value })}
            />
            <input
              type="datetime-local"
              value={editMode.dueDate}
              onChange={(e) => setEditMode({ ...editMode, dueDate: e.target.value })}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={cancelEditTask}>Cancel</button>
          </form>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task._id)}
            />
            <span>{task.title}</span>
            {task.dueDate && (
              <span className="due-date">
                Due: {new Date(task.dueDate).toLocaleString()}
                {isOverdue(task.dueDate) && <span className="overdue"> (OVERDUE)</span>}
              </span>
            )}
            <button onClick={() => startEditTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;