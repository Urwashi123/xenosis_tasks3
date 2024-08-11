import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';

const TaskContext = createContext();

const initialState = {
    tasks: [],
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: action.payload };
        case 'ADD_TASK':
            return { ...state, tasks: [action.payload, ...state.tasks] };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) => (task._id === action.payload._id ? action.payload : task)),
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload),
            };
        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const getTasks = async () => {
        try {
            const res = await axios.get('/api/tasks');
            dispatch({ type: 'SET_TASKS', payload: res.data });
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const addTask = async (formData) => {
        try {
            const res = await axios.post('/api/tasks', formData);
            dispatch({ type: 'ADD_TASK', payload: res.data });
            socket.emit('task updated', res.data);
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const updateTask = async (id, formData) => {
        try {
            const res = await axios.put(`/api/tasks/${id}`, formData);
            dispatch({ type: 'UPDATE_TASK', payload: res.data });
            socket.emit('task updated', res.data);
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            dispatch({ type: 'DELETE_TASK', payload: id });
            socket.emit('task updated', { _id: id });
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    useEffect(() => {
        socket.on('update', (task) => {
            if (task._id) {
                dispatch({ type: 'UPDATE_TASK', payload: task });
            } else {
                dispatch({ type: 'DELETE_TASK', payload: task._id });
            }
        });
        getTasks();

        return () => socket.off('update');
    }, []);

    return (
        <TaskContext.Provider value={{ ...state, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
