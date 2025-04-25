import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../features/taskSlice";

const EditTask = ({ task }) => {
  const [isEdit, SetIsEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const dispatch = useDispatch();

  const HandleSaveButton = () => {
    dispatch(editTask({ id: task.id, title, description, status }));
    SetIsEdit(false);
  };

  return (
    <div>
      {isEdit ? (
        <div className="absolute bg-white p-4 border rounded-md shadow-lg z-10">
          <h2 className="text-xl font-semibold mb-3 text-indigo-500">
            Edit Task
          </h2>
          <div className="mb-4">
            <input
              placeholder="Task Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            ></textarea>
          </div>
          <div className="mb-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 p-2"
              onClick={HandleSaveButton}
            >
              Save
            </button>
            <button
              type="submit"
              className=" bg-red-600 text-white py-2 rounded-md hover:bg-red-700 p-2"
              onClick={() => SetIsEdit(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          onClick={() => SetIsEdit(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditTask;
