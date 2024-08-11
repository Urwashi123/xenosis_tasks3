import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import TaskProvider from './context/TaskContext';
import Auth from './components/Notification'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    return (
        <AuthProvider>
            <TaskProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Auth />} />
                            <Route path="/tasks" element={<TaskList />} />
                            <Route path="/tasks/new" element={<TaskForm />} />
                        </Routes>
                    </div>
                </Router>
            </TaskProvider>
        </AuthProvider>
    );
};

export default App;
