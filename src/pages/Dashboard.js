import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import taskService from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import socket from '../socket';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await taskService.getTasks(user.token);
            setTasks(tasks);
        };

        fetchTasks();

        socket.on('taskUpdated', (updatedTask) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                )
            );
        });

        return () => {
            socket.off('taskUpdated');
        };
    }, [user.token]);

    const addTask = async (taskData) => {
        const newTask = await taskService.createTask(taskData, user.token);
        setTasks([...tasks, newTask]);
        socket.emit('taskUpdated', newTask);
    };

    return (
        <div>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default Dashboard;
