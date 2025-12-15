import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import './reports.css';
import reportService from '../../../services/report';

function Reports() {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const response = await reportService.getReports();
            setReports(response.reports || []);
        } catch (error) {
            console.error("Failed to load reports", error);
        } finally {
            setLoading(false);
        }
    };


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
                                <h3>{report.taskName}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.2rem' }}>Submitted on: {report.reportDate}</p>
                                {/* <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>By: <strong>{report.submittedBy}</strong></p> */}
                            </div>
                            <span className="report-status" style={{
                                backgroundColor: '#d4edda',
                                color: '#155724'
                            }}>
                                compeleted!
                            </span>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reports;
