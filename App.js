// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
