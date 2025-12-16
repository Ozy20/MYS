import React, { useEffect } from 'react';
import employeeService from '../../../services/employee';
import taskService from '../../../services/task';
import { useAuth } from '../../context/AuthContext';
import './dash.css';

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

    const handelEmpForm = (e) => {
        setEmpForm({
            ...empForm,
            [e.target.name]: e.target.value
        });
    }

    const handelTaskForm = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    }

    const handelAddEmp = async () => {
        try {
            const response = await employeeService.addEmployee(empForm);
            console.log(response);
            alert("Employee added successfully");
        }
        catch (error) {
            console.error("Error adding employee:", error);
            alert(error);
        }
    }
    const handelAssignTask = async () => {
        try {
            const response = await taskService.assignTask(task);
            console.log(response);
            alert("Task assigned successfully");
        }
        catch (error) {
            console.error("Error assigning task:", error);
            alert(error);
        }
    }
    return (
        <div id="dash">
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
                            onChange={handelEmpForm}
                        />
                        <input
                            type="text"
                            name="userName"
                            className='textField'
                            placeholder="User Name"
                            value={empForm.userName}
                            onChange={handelEmpForm}
                        />
                        <input
                            type="text"
                            name="email"
                            className='textField'
                            placeholder="Email Address"
                            value={empForm.email}
                            onChange={handelEmpForm}
                        />
                        <input
                            type="password"
                            name="password"
                            className='textField'
                            placeholder="Password"
                            value={empForm.password}
                            onChange={handelEmpForm}
                        />
                        <button className="btn-submit" onClick={handelAddEmp}>Create Account</button>
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
                            onChange={handelTaskForm}
                        />
                        <input
                            type="text"
                            name="description"
                            className='textField'
                            placeholder="Task Description"
                            value={task.description}
                            onChange={handelTaskForm}
                        />
                        <input
                            type="text"
                            name="empUserName"
                            className='textField'
                            placeholder="Assign To (Username)"
                            value={task.empUserName}
                            onChange={handelTaskForm}
                        />
                        <button className="btn-submit" onClick={handelAssignTask}>Assign Task</button>
                    </div>
                </div>
            </div>
            <div className="analysis" style={{ display: "flex", justifyContent: "center" }}>
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
        </div>
    );
}

export default ManagerDash;