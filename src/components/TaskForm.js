import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import './TaskForm.css'; // Importe o CSS

const TaskForm = () => {
    const [time, setTime] = useState('');
    const [activity, setActivity] = useState('');
    const [tool, setTool] = useState('');
    const [action, setAction] = useState('');
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(''); // Estado para armazenar erros
    const navigate = useNavigate(); // Hook para navegação

    const activities = [
        "Revisão de alertas críticos das últimas horas",
        "Análise de consumo de CPU e memória dos servidores",
        "Verificação de filas de processamento (mensageria, jobs, APIs)",
        "Conferência de logs de erro de aplicações críticas",
        "Revisão do tempo de resposta das APIs principais",
        "Análise de variação de tráfego nos sistemas",
        "Checagem de storage (uso de disco e crescimento)",
        "Validação da disponibilidade de serviços essenciais",
        "Análise de padrões de erro nos chamados do TopDesk",
        "Revisão do status de integrações entre sistemas",
        "Conferência de consumo de banco de dados (queries lentas, locks)",
        "Verificação de disponibilidade de servidores web",
        "Checkpoint de anomalias identificadas pela manhã",
        "Revisão do desempenho de aplicações",
        "Validação de consumo de recursos em ambiente de produção",
        "Revisão de alertas silenciosos (próximos ao threshold)",
        "Análise de eventos críticos nos logs de aplicações",
        "Revisão do status de backups automáticos",
        "Monitoramento de jobs críticos (execução e tempo de resposta)",
        "Comparação de tendências do dia com padrões anteriores",
        "Validação da integridade de discos e volumes de storage",
        "Revisão de alarmes ignorados ou silenciados",
        "Checkpoint de anomalias detectadas à tarde",
        "Revisão final da saúde do ambiente antes da virada do dia",
        "Análise e encaminhamento do e-mail de processamento dos clearing’s bom e top.",
        "Acesso remoto no depot para retirar os arquivos a serem processados na garagem.",
        "Validação das ferramentas e serviços específicos da garagem.",
        "Abertura de incidente, gestão, encerramento.",
        "Análise dos chamados diários da fila do Top Desk do N1.",
        "Processamento dos arquivos recebidos pela AT.",
        "Acompanhamento de binários retidos com apoio da monitoria e script de robô para notificar a garagem sobre os arquivos retidos.",
        "Acompanhamento diário do robô para entregas dos QR codes de supressão.",
        "Acompanhamento de GMUD",
        "Treinamento para os N0 diariamente.",
        "Correção de arquivos processados na empresa errada"
    ];

    const tools = [
        "Zabbix",
        "Grafana",
        "Instana",
        "Grafana / Instana",
        "Grafana / Zabbix / Instana",
        "Zabbix / Instana",
        "TopDesk",
        "Todas"
    ];

    const actions = [
        "Se houver reincidência de alarmes, abrir chamado no TopDesk",
        "Se houver crescimento anormal, documentar e acionar time de infraestrutura",
        "Se houver acúmulo excessivo, escalar para o time responsável",
        "Se houver aumento de erros 500 ou timeouts, documentar no grupo",
        "Se latência > limite aceitável, abrir alerta manual",
        "Se houver queda brusca, verificar logs no Instana e reportar anomalia",
        "Se uso > 85%, escalar para expansão preventiva",
        "Se algum serviço estiver offline, acionar imediatamente o suporte",
        "Se houver tendência recorrente, iniciar investigação proativa",
        "Se alguma integração falhar, abrir incidente",
        "Se houver alto tempo de resposta, escalar para DBA",
        "Se houver queda ou lentidão, acionar infraestrutura",
        "Consolidar observações e reportar tendências",
        "Se houver anomalias, notificar o time responsável",
        "Comparar com histórico e reportar crescimento incomum",
        "Se algum recurso estiver perto do limite, abrir ação preventiva",
        "Se houver falhas frequentes, escalar para desenvolvimento",
        "Se backup falhar, escalar imediatamente",
        "Se houver falhas ou atrasos, escalar para equipe responsável",
        "Se houver desvio significativo, documentar e alertar",
        "Se houver risco de esgotamento, escalar para armazenamento",
        "Se houver alarmes frequentes ignorados, revisar threshold",
        "Consolidar observações e propor ajustes de configuração",
        "Se necessário, acionar times para ajustes emergenciais"
    ];

    const statuses = [
        "Em Aberto",
        "Em Acompanhamento",
        "Em Desenvolvimento",
        "Aguardando Retorno do Usuário",
        "Pendente Terceiros",
        "Em Análise",
        "Resolvido",
        "Fechado"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tasks', {
                time,
                activity,
                tool,
                action,
                status,
                comment,
            });
            alert('Tarefa cadastrada com sucesso!');
        } catch (err) {
            setError('Erro ao cadastrar tarefa. Tente novamente.');
            console.error(err);
        }
    };

    return (
        <div className="task-form-container">
            <h2>Cadastro de Tarefas</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                >
                    <option value="">Selecione o horário</option>
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={`${i < 10 ? '0' + i : i}h00`}>
                            {`${i < 10 ? '0' + i : i}h00`}
                        </option>
                    ))}
                </select>
                <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    required
                >
                    <option value="">Selecione a atividade</option>
                    {activities.map((act, index) => (
                        <option key={index} value={act}>{act}</option>
                    ))}
                </select>
                <select
                    value={tool}
                    onChange={(e) => setTool(e.target.value)}
                    required
                >
                    <option value="">Selecione a ferramenta</option>
                    {tools.map((tool, index) => (
                        <option key={index} value={tool}>{tool}</option>
                    ))}
                </select>
                <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    required
                >
                    <option value="">Selecione a ação</option>
                    {actions.map((action, index) => (
                        <option key={index} value={action}>{action}</option>
                    ))}
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="">Selecione o status</option>
                    {statuses.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
                <textarea
                    placeholder="Comentário"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            <button
                onClick={() => navigate('/tasklist')} // Redireciona para a página TaskList.js
                className="view-tasks-button"
            >
                Conferir Lista
            </button>
        </div>
    );
};

export default TaskForm;