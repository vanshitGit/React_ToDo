import { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (!taskText.trim() || !taskDate || !taskTime) {
      alert("Please fill all fields!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      date: taskDate,
      time: taskTime,
      completed: false,
    };

    saveTasksToLocalStorage([...tasks, newTask]);
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleEditChange = (id, field, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, [field]: value } : task
    );
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          📝 To-Do List
        </h2>

        {/* Task Input Form */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Task Name"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            ➕ Add Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4">Task</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Completed</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b text-center">
                    <td className="py-2 px-4">
                      {editTaskId === task.id ? (
                        <input
                          type="text"
                          value={task.text}
                          onChange={(e) =>
                            handleEditChange(task.id, "text", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        <span
                          className={
                            task.completed ? "line-through text-gray-500" : ""
                          }
                        >
                          {task.text}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4">{task.date}</td>
                    <td className="py-2 px-4">
                      {editTaskId === task.id ? (
                        <input
                          type="time"
                          value={task.time}
                          onChange={(e) =>
                            handleEditChange(task.id, "time", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        task.time
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="h-5 w-5"
                      />
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      {editTaskId === task.id ? (
                        <button
                          onClick={() => setEditTaskId(null)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          ✅ Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditTaskId(task.id)}
                          className="bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          ✏️ Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No tasks added yet!</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
