function TaskCounter({ totalTasks, completedTasks }) {
    // Displays total/completed — always global, not filtered
    return (
      <span className="task-counter">
        {totalTasks}/{completedTasks}
      </span>
    );
  }
  
export default TaskCounter;
  