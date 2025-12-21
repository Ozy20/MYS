import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './dash.css';
import { handelEmpForm, handelTaskForm, handelAddEmp, handelAssignTask } from '../../handelers/managerHandlers';

function ManagerDash() {
    const { user } = useAuth();
    const [empForm, setEmpForm] = React.useState({
        name: '',
        email: '',
        userName: '',
        password: '',
    });
    const [task, setTask] = React.useState({
        title: '',
        description: '',
        empUserName: '',
    });

    useEffect(() => {
        console.log("Updated empForm:", empForm);
    }, [empForm]);

    useEffect(() => {
        console.log("Updated task:", task);
    }, [task]);
    return (
        <div id="dash">
            <div className="analysis" style={{}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4A628A" class="bi bi-clipboard-data" viewBox="0 0 16 16" style={{ marginTop: "20px" }}>
                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                </svg>
                <div className="no">
                    <h2>Total Employees <span className="number">{user.numOfEmployees}</span></h2>
                </div>
                <div className="no">
                    <h2>Total Tasks <span className="number">{user.numOfTasks}</span></h2>
                </div>
                <div className="no">
                    <h2>Total Reports <span className="number">{user.numOfReports}</span></h2>
                </div>
            </div>
            <div id="actions">
                <div className="action">
                    <h2>Add Employee</h2>
                    <div className="form-container">
                        <input
                            type="text"
                            name="name"
                            className='textField'
                            placeholder="Full Name"
                            value={empForm.name}
                            onChange={(e) => handelEmpForm(e, empForm, setEmpForm)}
                        />
                        <input
                            type="text"
                            name="userName"
                            className='textField'
                            placeholder="User Name"
                            value={empForm.userName}
                            onChange={(e) => handelEmpForm(e, empForm, setEmpForm)}
                        />
                        <input
                            type="text"
                            name="email"
                            className='textField'
                            placeholder="Email Address"
                            value={empForm.email}
                            onChange={(e) => handelEmpForm(e, empForm, setEmpForm)}
                        />
                        <input
                            type="password"
                            name="password"
                            className='textField'
                            placeholder="Password"
                            value={empForm.password}
                            onChange={(e) => handelEmpForm(e, empForm, setEmpForm)}
                        />
                        <button className="btn-submit" onClick={() => handelAddEmp(empForm)}>Create Account</button>
                    </div>
                </div>
                <div className="action">
                    <h2>Assign Task</h2>
                    <div className="form-container">
                        <input
                            type="text"
                            name="title"
                            className='textField'
                            placeholder="Task Title"
                            value={task.title}
                            onChange={(e) => handelTaskForm(e, task, setTask)}
                        />
                        <input
                            type="text"
                            name="description"
                            className='textField'
                            placeholder="Task Description"
                            value={task.description}
                            onChange={(e) => handelTaskForm(e, task, setTask)}
                        />
                        <input
                            type="text"
                            name="empUserName"
                            className='textField'
                            placeholder="Assign To (Username)"
                            value={task.empUserName}
                            onChange={(e) => handelTaskForm(e, task, setTask)}
                        />
                        <button className="btn-submit" onClick={() => handelAssignTask(task)}>Assign Task</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ManagerDash;