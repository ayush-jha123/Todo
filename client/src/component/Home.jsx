import React, { useState, useEffect } from "react";
import bgvedio from "../assets/bgvedio.mp4";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from JSONPlaceholder API
  const fetchTasks = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
      const data = await response.json();
      setTasks(data); // Fetch first 10 tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task (simulate with POST request)
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask,
          completed: false,
        }),
      });
      const addedTask = await response.json();
      setTasks([...tasks, { ...addedTask, id: tasks.length + 1 }]); // Append task with mock ID
      setNewTask(""); // Clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit a task (simulate with PATCH request)
  const handleEditTask = async (id) => {
    const updatedTitle = prompt("Edit task:", tasks.find((task) => task.id === id)?.title);
    if (!updatedTitle) return;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updatedTitle }),
      });
      await response.json();
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: updatedTitle } : task
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Delete a task (simulate with DELETE request)
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-w-screen min-h-screen">
      <video
        src={bgvedio}
        className="w-full h-full flex flex-center object-cover absolute z-[-1]"
        autoPlay
        muted
        loop
      />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[90%] h-[95%] bg-[rgba(0,0,0,0.6)] border-gray-600 border-2 border-solid rounded-md shadow-md">
          <h1 className="p-3 font-mono text-[5rem] text-gray-200">TODO APP</h1>
          <div className="flex flex-col w-full items-center gap-5">
            <div className="flex justify-center w-full">
              <div className="w-2/3 flex flex-row gap-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Add New Task.."
                />
                <FaPlus
                  onClick={handleAddTask}
                  className="bg-blue-700 hover:bg-blue-900 cursor-pointer w-[5rem] text-white size-12 p-2 rounded-md"
                />
              </div>
            </div>
            <div className="p-4 ring-1 ring-white m-3 rounded-md w-2/3">
              <p className="text-lg text-white text-[3rem] font-mono">Tasks ({tasks.length})</p>
              <div className="w-full m-2 p-2 flex flex-col space-y-2 rounded-md h-[24rem] overflow-y-scroll">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white flex flex-row mt-3 p-2 justify-between rounded-md"
                  >
                    <div className="flex flex-row">
                      <p className="font-semibold font-serif">{task.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="bg-slate-100 ring-2 p-3 rounded-lg hover:bg-red-600 hover:text-white w-[6rem]"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="bg-slate-100 ring-2 p-3 rounded-lg hover:bg-green-600 hover:text-white w-[6rem]"
                        onClick={() => handleEditTask(task.id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
