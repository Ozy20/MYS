import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import './tasks.css';
import taskService from '../../../services/task';
import { useAuth } from '../../context/AuthContext';
function Tasks() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks(user.role);
    }, []);

    const loadTasks = async (role) => {
        try {
            const response = await taskService.getTasks(role);
            setTasks(response.tasks || []);
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="tasks-page-container">
            <div className="task-list">
                <h2 style={{ paddingLeft: '1rem', paddingTop: '1rem', width: '100%' }}>All Tasks</h2>
                <div style={{ overflowY: 'auto', height: 'calc(100% - 60px)', padding: '0 1rem 1rem 1rem' }}>
                    {tasks.map(task => (
                        <Card
                            key={task.id}
                            onClick={() => navigate(`/app/tasks/${task.id}`)}
                            style={{
                                cursor: 'pointer',
                                borderLeft: '5px solid #4A628A',
                                marginBottom: '1rem',
                                padding: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <span className="task-status" style={{
                                backgroundColor: task.status === 'completed' ? '#d4edda' : task.status === 'in-progress' ? '#fff3cd' : '#f8d7da',
                                color: task.status === 'c   ompleted' ? '#155724' : task.status === 'in-progress' ? '#856404' : '#721c24'
                            }}>
                                {task.status}
                            </span>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tasks;
