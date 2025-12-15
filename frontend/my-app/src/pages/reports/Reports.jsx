import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import './reports.css';

function Reports() {
    const navigate = useNavigate();
    // Mock data for reports
    const reports = [
        { id: 1, title: 'Q3 Financial Analysis', date: '2024-10-15', submittedBy: 'Alice Johnson', status: 'Approved' },
        { id: 2, title: 'Employee Performance Review', date: '2024-10-20', submittedBy: 'Bob Smith', status: 'Pending' },
        { id: 3, title: 'System Security Audit', date: '2024-10-22', submittedBy: 'Charlie Brown', status: 'In Review' },
        { id: 4, title: 'Marketing Campaign ROI', date: '2024-10-25', submittedBy: 'Dana White', status: 'Rejected' },
        { id: 5, title: 'Inventory Status Report', date: '2024-10-28', submittedBy: 'Evan Davis', status: 'Approved' },
        { id: 6, title: 'Customer Feedback Summary', date: '2024-11-01', submittedBy: 'Fiona Green', status: 'Approved' },
        { id: 7, title: 'IT Infrastructure Upgrade', date: '2024-11-05', submittedBy: 'George Hill', status: 'Pending' },
    ];

    return (
        <div id="reports-page-container">
            <div className="report-list">
                <h2 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>All Reports</h2>
                <div style={{ overflowY: 'auto', height: 'calc(100% - 60px)', padding: '0 1rem 1rem 1rem' }}>
                    {reports.map(report => (
                        <Card
                            key={report.id}
                            onClick={() => navigate(`/app/reports/${report.id}`)}
                            style={{
                                cursor: 'pointer',
                                borderLeft: `5px solid ${report.status === 'Approved' ? '#28a745' : report.status === 'Rejected' ? '#dc3545' : '#ffc107'}`,
                                marginBottom: '1rem',
                                padding: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div className="report-info">
                                <h3>{report.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.2rem' }}>Submitted on: {report.date}</p>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>By: <strong>{report.submittedBy}</strong></p>
                            </div>
                            <span className="report-status" style={{
                                backgroundColor: report.status === 'Approved' ? '#d4edda' : report.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                                color: report.status === 'Approved' ? '#155724' : report.status === 'Rejected' ? '#721c24' : '#856404'
                            }}>
                                {report.status}
                            </span>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reports;
