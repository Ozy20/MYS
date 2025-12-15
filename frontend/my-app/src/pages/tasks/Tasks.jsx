import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import './tasks.css';

function Tasks() {
    const navigate = useNavigate();

    const tasks = [
        { id: 1, title: 'Fix Login Bug', description: 'Investigate and fix the login issue on mobile.', assignee: 'john_doe', status: 'Pending' },
        { id: 2, title: 'Update Dashboard UI', description: 'Revamp the manager dashboard with new stats.', assignee: 'sarah_smith', status: 'In Progress' },
        { id: 3, title: 'Database Optimization', description: 'Optimize queries for faster load times.', assignee: 'mike_brown', status: 'Completed' },
        { id: 4, title: 'Client Meeting Preparation', description: 'Prepare slides for the upcoming client meeting.', assignee: 'emma_williams', status: 'Pending' },
        { id: 5, title: 'Content Review', description: 'Review the new blog posts for accuracy.', assignee: 'david_miller', status: 'In Progress' },
    ];

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
                                <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>Assigned to: <strong>{task.assignee}</strong></p>
                            </div>
                            <span className="task-status" style={{
                                backgroundColor: task.status === 'Completed' ? '#d4edda' : task.status === 'In Progress' ? '#fff3cd' : '#f8d7da',
                                color: task.status === 'Completed' ? '#155724' : task.status === 'In Progress' ? '#856404' : '#721c24'
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
