import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import './reports.css';

function ReportDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const report = {
        id: id,
        title: 'Q3 Financial Analysis',
        date: '2024-10-15',
        submittedBy: 'Alice Johnson',
        status: 'Approved',
        content: 'This report details the financial performance of Q3. Revenue increased by 15% compared to last quarter. Key growth areas included the new subscription model and enterprise partnerships. Operating costs remained stable.'
        , sammary: "sammary"
    };

    return (
        <div id="reports-page-container">
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
                    &larr; Back to Reports
                </button>
            </div>

            <Card style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, color: '#2c3e50' }}>{report.title}</h2>
                        <span className="report-status" style={{
                            backgroundColor: report.status === 'Approved' ? '#d4edda' : report.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                            color: report.status === 'Approved' ? '#155724' : report.status === 'Rejected' ? '#721c24' : '#856404'
                        }}>
                            {report.status}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: '#666', fontSize: '0.9rem' }}>
                    <div>Submitted by: <strong>{report.submittedBy}</strong></div>
                    <div>Date: <strong>{report.date}</strong></div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#4A628A', fontSize: '1.1rem' }}>Report Content</h3>
                    <div style={{
                        background: '#f9f9f9',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        color: '#444',
                        lineHeight: '1.8'
                    }}>
                        {report.content}
                    </div>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#4A628A', fontSize: '1.1rem' }}>sammary</h3>
                    <div style={{
                        background: '#f9f9f9',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        color: '#444',
                        lineHeight: '1.8'
                    }}>
                        {report.sammary}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ReportDetails;
