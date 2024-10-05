import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './task-list.css'
import API_BASE_URL from '../config';

const TaskList = ({ tasks,fetchTasks,setIsModalOpen,setSingle,setIsEdit}) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);

    fetchTasks();
  };

  const handleEdit = (task) => {
    setSingle(task)
    setIsModalOpen(true);
    setIsEdit(true)
  };

  return (
    <div className="p-6 bg-teal-600 min-h-2 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Task List</h1>

      <div className="mb-4 flex justify-between">
        <select hidden={tasks.length === 0 ?true:false}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 pr-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
        onClick={() => setIsModalOpen(true)}
        className="bg-black hover:text-white text-teal-600 px-4 py-2 rounded-md mb-4"
      >
        Add Task
      </button>
      </div>

      <div className="space-y-4 max-h-[320px] min-h-[320px] overflow-scroll scrollbar-hidden">
      {tasks.length === 0 ? (
        <div className='flex min-h-[250px] justify-center items-center'>
        <p className=' font-bold text-white'>No tasks available.</p>
        </div>
      ) : (
        tasks
          .filter((task) => !filter || task.status === filter)
          .map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="mb-4">{task.description}</p>
              <p className="mb-4">
                <span className="font-bold">Status:</span> {task.status}
              </p>
              <div className='flex gap-x-8'>
              <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
