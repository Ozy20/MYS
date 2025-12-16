import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import taskService from '../../../services/task';
import reportService from '../../../services/report';
import './tasks.css';

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isEmployee, user } = useAuth();
    const [task, setTask] = useState({});
    const [reportText, setReportText] = useState('');

    const reportChangeHandeler = (e) => {
        const val = e.target.value;
        setReportText(val);
        console.log(val)
    }

    const submitReport = async () => {
        if (!reportText.trim()) {
            alert("Please enter report content");
            return;
        }
        try {
            const payload = {
                taskId: id,
                reportContent: reportText,
                reportSammary: reportText.substring(0, 50) + "..."
            };
            const { error } = await reportService.sendReport(payload, user.role);
            if (!error) {
                alert("Report submitted successfully");
                setReportText('');
            } else {
                console.error(error);
                alert("Failed to submit report");
            }
        }
        catch (error) {
            console.error("Failed to submit report", error);
            alert("Failed to send report")
        }
    }

    useEffect(() => {
        const loadTask = async () => {
            try {
                const { error, task } = await taskService.getSingleTask(id, user.role);
                if (!error) {
                    setTask(task);
                }
            }
            catch (error) {
                console.error("Failed to load task", error);
            }
        };
        loadTask();
    }, [id]);


    return (
        <div id="tasks-page-container">
            <div style={{ marginBottom: '1rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#4A628A',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    &larr; Back to Tasks
                </button>
            </div>

            <Card style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, color: '#2c3e50' }}>{task.title}</h2>
                        <span className="task-status" style={{
                            backgroundColor: task.status === 'Completed' ? '#d4edda' : task.status === 'in-progress' ? '#fff3cd' : '#f8d7da',
                            color: task.status === 'Completed' ? '#155724' : task.status === 'in-progress' ? '#856404' : '#721c24'
                        }}>
                            {task.status}
                        </span>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#4A628A', fontSize: '1.1rem' }}>Description</h3>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>{task.description}</p>
                </div>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: '#666', fontSize: '0.9rem' }}>
                    <div>Assigned to: <strong>{task.empName}</strong></div>
                    <div>Created on: <strong>{task.createdAt}</strong></div>
                </div>

                {isEmployee && (
                    <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                        <h3 style={{ color: '#4A628A', fontSize: '1.1rem', marginBottom: '1rem' }}>Submit Report / Update</h3>
                        <textarea
                            value={reportText}
                            onChange={(e) => reportChangeHandeler(e)}
                            placeholder="Type your progress report here..."
                            style={{
                                width: '95%',
                                minHeight: '100px',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                marginBottom: '1rem'
                            }}
                        />
                        <button
                            className="btn-submit"
                            onClick={() => submitReport()}
                            style={{ width: 'auto', padding: '10px 24px' }}
                        >
                            Submit Report
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default TaskDetails;
