import { useState } from 'react';
import './App.css';

/* ===== Icons (from src/assets/) ===== */
import menuIcon from './assets/menu_icon.png';
import searchIcon from './assets/search_icon.png';
import inboxIcon from './assets/inbox_icon.png';
import upcomingIcon from './assets/upcoming_icon.png';
import calendarIcon from './assets/calendar_icon.png';
import checkIcon from './assets/check_icon.png';

/* ===== Your Components ===== */
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskCounter from './components/TaskCounter';


function App() {
  /* All tasks live here */
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Learn React', completed: false },
    { id: '2', text: 'Finish INFO 153A Task Manager', completed: true },
  ]);

  /* Filter state: 'all' | 'active' | 'completed' */
  const [filter, setFilter] = useState('all');

  /* Add new task */
  const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  /* Toggle completion */
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /* Delete task */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  /* Derived counts */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  /* Filtered array for display */
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="everything">
      {/* HEADER */}
      <header className="site-header">
        <div className="header-left">
          <button className="menu-btn" type="button">
            <img src={menuIcon} alt="Menu" className="menu-img" />
          </button>

          <div className="search-container">
            <img src={searchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Quick find"
            />
          </div>
        </div>

        {/* Top-right counter: total/completed */}
        <div className="count">
          <img src={checkIcon} alt="Completed icon" className="menu-img" />
          <TaskCounter
            totalTasks={totalTasks}
            completedTasks={completedTasks}
          />
        </div>
      </header>

      {/* SIDEBAR + CONTENT */}
      <div className="shell">
        <aside className="sidebar">
          <nav>
            <ul className="nav-list">
              <li className="nav-link">
                <img src={inboxIcon} alt="Inbox" width={24} height={24} />
                <span className="nav-text">Inbox</span>
                <span className="nav-count">{totalTasks}</span>
              </li>
              <li className="nav-link">
                <img src={upcomingIcon} alt="Active" width={24} height={24} />
                <span className="nav-text">Active</span>
                <span className="nav-count">{activeTasks}</span>
              </li>
              <li className="nav-link">
                <img src={calendarIcon} alt="Completed" width={24} height={24} />
                <span className="nav-text">Completed</span>
                <span className="nav-count">{completedTasks}</span>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <h1>Inbox</h1>

          <TaskForm onAddTask={addTask} />

          <div className="filter-buttons">
            <button
              type="button"
              className={
                filter === 'all'
                  ? 'filter-btn filter-btn--active'
                  : 'filter-btn'
              }
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={
                filter === 'active'
                  ? 'filter-btn filter-btn--active'
                  : 'filter-btn'
              }
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              type="button"
              className={
                filter === 'completed'
                  ? 'filter-btn filter-btn--active'
                  : 'filter-btn'
              }
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          {filteredTasks.length === 0 ? (
            <p className="empty-state">No tasks in this view.</p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
