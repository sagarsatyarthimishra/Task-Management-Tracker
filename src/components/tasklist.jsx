import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, fetchTodo, setStatus } from "../features/taskSlice";
import EditTask from "./EditTask";

const Tasklist = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.task);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDeleteBtn = (id) => {
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (e) => {
    dispatch(setStatus(e.target.value));
  };

  const filteredTasks = tasks.filter((task) => {
    if (status === "All") return true;
    return task.status === status;
  });

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Task List</h2>
        <div>
          <label className="text-gray-600 mr-2">Filter:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded px-2 py-1"
          >
            <option value="All">All</option>
            <option value="To do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-gray-100 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              <p className="text-sm mt-1">
                Status: <span className="font-medium">{task.status}</span>
              </p>
            </div>
            <div className="flex space-x-2">
              <EditTask task={task} />
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteBtn(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasklist;
