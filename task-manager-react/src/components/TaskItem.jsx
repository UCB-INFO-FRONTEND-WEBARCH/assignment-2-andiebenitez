function TaskItem({ task, onToggle, onDelete }) {
    return (
      <li className="task-item">
        <label>
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
  
          <span
            className={
              task.completed
                ? 'task-text task-text--completed'
                : 'task-text'
            }
          >
            {task.text}
          </span>
        </label>
  
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.text}`}
        >
          ×
        </button>
      </li>
    );
  }
  
  export default TaskItem;
  