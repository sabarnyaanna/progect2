import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from './components/TodoList';
import UpdateList from './components/UpdateList';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${API_URL}?_limit=5`);
        setTasks(res.data);
      } catch (err) {
        console.error('Помилка завантаження:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    try {
      const res = await axios.post(API_URL, { title, completed: false });
      const newTask = { ...res.data, id: Date.now() };
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error('Помилка додавання:', err);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Помилка видалення:', err);
    }
  };

  const editTask = async (id, newTitle) => {
    try {
      await axios.put(`${API_URL}/${id}`, { title: newTitle });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
      );
    } catch (err) {
      console.error('Помилка оновлення:', err);
    }
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container">
      <div className="header-title">
        <h1>TO DO</h1>
        <div className="subtitle">List</div>
        <div className="divider">♥</div>
        <div className="quote">One step at a time. You've got this!</div>
      </div>

      <UpdateList onAddTask={addTask} />

      {loading ? (
        <p style={{ textAlign: 'center', color: '#a89485' }}>Завантаження списку...</p>
      ) : (
        <TodoList
          tasks={tasks}
          onDelete={removeTask}
          onEdit={editTask}
          onToggle={toggleTask}
        />
      )}

      <div className="footer-quote">Focus. Plan. Do. Repeat.</div>
    </div>
  );
}

export default App;