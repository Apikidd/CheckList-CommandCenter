import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importe o arquivo de estilos

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Verifica se o e-mail e a senha foram fornecidos
        if (!email || !password) {
            setError('E-mail e senha são obrigatórios');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            if (response.data.message === 'Login bem-sucedido') {
                // Redireciona para a página TaskList.js após o login
                navigate('/tasklist');
            }
        } catch (err) {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/register')}>Registrar novo usuário</button>
        </div>
    );
};

export default Login;