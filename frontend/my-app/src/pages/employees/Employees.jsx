import React, { useState, useEffect } from 'react';
import EmployeeCard from '../../components/employeeCard/EmployeeCard';
import employeeService from '../../../services/employee';
import './Employees.css';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const response = await employeeService.getAllEmployees();
            setEmployees(response.employees || []);
        } catch (error) {
            console.error("Failed to load employees", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (employee) => {
        alert(`Modify feature coming soon for: ${employee.name}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await employeeService.deleteEmployee(id);
                setEmployees(employees.filter(emp => emp.id !== id));
            } catch (error) {
                console.error("Failed to delete employee", error);
                alert("Failed to delete employee");
            }
        }
    };

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
                        onDelete={handleDelete}
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
