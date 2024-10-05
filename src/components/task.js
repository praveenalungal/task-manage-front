import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const TaskForm = ({ single, isOpen, onClose,fetchTasks,isEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  console.log('single',single)
  useEffect(()=>{
    if (Object.keys(single).length !==0) {
        setTitle(single.title);
        setDescription(single.description);
        setStatus(single.status);
      } else {
        setTitle('');
        setDescription('');
        setStatus('pending');
      }
    }, [single]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(single).length !==0) {
        await axios.put(`${API_BASE_URL}/tasks/${single.id}`,{
            title,
            description,
            status,
          });

      } else {
        console.log('nreeee data')
        await axios.post(`${API_BASE_URL}/tasks`, {
            title,
            description,
            status,
          });
      }

    fetchTasks();
    setTitle('');
    setDescription('');
    setStatus('pending');
    onClose(true)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white px-28 py-9 rounded-lg shadow-md z-10 relative">
      <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[20px] text-gray-500 hover:text-red-700"
        >
           &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

        <div className='flex justify-end'>
          <button
            type="submit"
            className="bg-teal-500 text-white px-7 py-2 rounded-md hover:bg-teal-600"
          >
            {isEdit?'update':'Add'}
          </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default TaskForm;
