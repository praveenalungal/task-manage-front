import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/task';
import TaskList from './components/task-list';
import API_BASE_URL from './config';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [single,setSingle] = useState({});
  const [isedit,setIsEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Task Management</h1>
        <TaskForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fetchTasks={fetchTasks} single={single} isEdit={isedit}/>
        <TaskList setIsModalOpen={setIsModalOpen} tasks={tasks} fetchTasks={fetchTasks} setSingle={setSingle} setIsEdit={setIsEdit}/>
    </div>
  );
};

export default App;
