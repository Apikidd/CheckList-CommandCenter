import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList'; // Importe o novo componente
import './styles.css'; // Importe o arquivo de estilos globais

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskForm />} />
                <Route path="/tasklist" element={<TaskList />} /> {/* Nova rota */}
            </Routes>
        </Router>
    );
}

export default App;