import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './sideNav.css';

function SideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isManager } = useAuth();
    const userRole = isManager ? 'manager' : 'employee';

    const handleNavClick = (path) => {
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div id="nav-container">
            <div id="header">
                <div id="title">
                    MYS
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4A628A" className="bi bi-list-task" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
                    <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                    <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
                </svg>
            </div>

            {userRole === 'manager' ? (
                <div id="nav">
                    <div
                        className={`nav-option ${isActive('/app/dashboard') ? 'selected' : ''}`}
                        onClick={() => handleNavClick('/app/dashboard')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                            <path d="M6.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M4 12.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0" />
                        </svg>
                        <span>Dashboard</span>
                    </div>
                    <div
                        className={`nav-option ${isActive('/app/reports') ? 'selected' : ''}`}
                        onClick={() => handleNavClick('/app/reports')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.362l-1.447-1.447a.5.5 0 0 0-.707.707l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5a.5.5 0 0 0-.707-.707L8.5 9.862z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                        </svg>
                        <span>Reports</span>
                    </div>
                    <div
                        className={`nav-option ${isActive('/app/tasks') ? 'selected' : ''}`}
                        onClick={() => handleNavClick('/app/tasks')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.362l-1.447-1.447a.5.5 0 0 0-.707.707l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5a.5.5 0 0 0-.707-.707L8.5 9.862z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                        </svg>
                        <span>Tasks</span>
                    </div>
                </div>
            ) : (
                <div id="nav">
                    <div
                        className={`nav-option ${isActive('/app/tasks') ? 'selected' : ''}`}
                        onClick={() => handleNavClick('/app/tasks')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm1.958-1.687A.875.875 0 0 0 8.021.145a.875.875 0 0 0-.958 1.687 2.246 2.246 0 0 1 1.957 1.957 2.246 2.246 0 0 0 1.957-1.957z" />
                        </svg>
                        <span>My Tasks</span>
                    </div>
                    <div
                        className={`nav-option ${isActive('/app/reports') ? 'selected' : ''}`}
                        onClick={() => handleNavClick('/app/reports')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.71l-5.223 2.206A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                        </svg>
                        <span>Reports</span>
                    </div>

                </div>
            )}
        </div>
    );
}

export default SideNav;