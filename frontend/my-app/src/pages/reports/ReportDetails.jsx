import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import './reports.css';
import reportService from '../../../services/report';
import { useAuth } from '../../context/AuthContext';
function ReportDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState({});
    const { user } = useAuth();
    useEffect(() => {
        const loadReport = async () => {
            try {
                const { error, report } = await reportService.getSingleReport(id, user.role);
                if (!error) {
                    setReport(report);
                }
            }
            catch (error) {
                console.error("Failed to load report", error);
            }
        };
        loadReport();
    }, [id]);

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
                        <h2 style={{ margin: 0, color: '#2c3e50' }}>{report.taskName}</h2>
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
                    <div>Date: <strong>{report.reportDate}</strong></div>
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
                        {report.reportContent}
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
                        {report.reportSammary}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ReportDetails;
