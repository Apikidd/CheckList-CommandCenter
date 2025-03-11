import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Importe a biblioteca xlsx
import './TaskList.css'; // Importe o arquivo de estilos

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(''); // Estado para armazenar erros
    const navigate = useNavigate();

    // Função para buscar as tarefas
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data); // Atualiza o estado com as tarefas
            setLoading(false); // Finaliza o carregamento
        } catch (err) {
            setError('Erro ao carregar tarefas');
            setLoading(false);
        }
    };

    // Função para exportar as tarefas para Excel
    const exportToExcel = () => {
        // Cria um array de objetos com os dados das tarefas
        const data = tasks.map((task) => ({
            Horário: task.time,
            Atividade: task.activity,
            Ferramenta: task.tool,
            Ação: task.action,
            Status: task.status,
            Comentário: task.comment,
        }));

        // Cria uma nova planilha
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Cria um novo workbook e adiciona a planilha
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tarefas');

        // Gera o arquivo Excel e faz o download
        XLSX.writeFile(workbook, 'tarefas.xlsx');
    };

    // Função para retornar a classe CSS com base no status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Em Aberto':
                return 'status-aberto';
            case 'Em Acompanhamento':
                return 'status-acompanhamento';
            case 'Em Desenvolvimento':
                return 'status-desenvolvimento';
            case 'Aguardando Retorno do Usuário':
                return 'status-aguardando';
            case 'Pendente Terceiros':
                return 'status-pendente';
            case 'Em Análise':
                return 'status-analise';
            case 'Resolvido':
                return 'status-resolvido';
            case 'Fechado':
                return 'status-fechado';
            default:
                return ''; // Caso padrão (sem classe)
        }
    };

    // Função para deslogar o usuário
    const handleLogout = () => {
        // Aqui você pode adicionar lógica para limpar tokens ou informações do usuário
        // Exemplo: localStorage.removeItem('token');

        // Redireciona para a página de login
        navigate('/');
    };

    // Busca as tarefas quando o componente é montado
    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <p>Carregando tarefas...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="task-list-container">
            <h2>Tarefas Cadastradas</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Horário</th>
                        <th>Atividade</th>
                        <th>Ferramenta</th>
                        <th>Ação</th>
                        <th>Status</th>
                        <th>Comentário</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.time}</td>
                            <td>{task.activity}</td>
                            <td>{task.tool}</td>
                            <td>{task.action}</td>
                            <td className={getStatusClass(task.status)}>{task.status}</td>
                            <td>{task.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
                <button onClick={() => navigate('/tasks')} className="add-task-button">
                    Adicionar Nova Tarefa
                </button>
                <button onClick={exportToExcel} className="export-button">
                    Exportar para Excel
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Deslogar
                </button>
            </div>
        </div>
    );
};

export default TaskList;