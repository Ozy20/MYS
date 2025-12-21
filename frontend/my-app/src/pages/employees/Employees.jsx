import React, { useState, useEffect } from 'react';
import EmployeeCard from '../../components/employeeCard/EmployeeCard';
import { loadEmployees, handleDelete, handleEdit } from '../../handelers/employeesHandlers';
import './Employees.css';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees(setEmployees, setLoading);
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="employees-page">
            <div className="employees-header">
                <h2>Employees</h2>
            </div>

            <div className="employees-grid">
                {employees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onEdit={handleEdit}
                        onDelete={(userName) => handleDelete(userName, employees, setEmployees)}
                    />
                ))}
            </div>

            {employees.length === 0 && (
                <div className="no-employees">
                    <p>No employees found.</p>
                </div>
            )}
        </div>
    );
}

export default Employees;
