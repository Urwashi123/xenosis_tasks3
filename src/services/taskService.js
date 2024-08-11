import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getTasks = async (token) => {
    const res = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const createTask = async (taskData, token) => {
    const res = await axios.post(API_URL, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const taskService = {
    getTasks,
    createTask,
};

export default taskService;
