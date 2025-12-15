import React from 'react';
import './EmployeeCard.css';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
    return (
        <div className="employee-card">
            <div className="employee-info">
                <h3>Name: {employee.name}</h3>
                <p>User Name: {employee.userName}</p>
                <p>ID: {employee.id}</p>
                <p className="email">Email: {employee.email}</p>
            </div>
            <div className="employee-actions">
                <button className="btn-edit" onClick={() => onEdit(employee)}>Modify</button>
                <button className="btn-delete" onClick={() => onDelete(employee.id)}>Delete</button>
            </div>
        </div>
    );
};

export default EmployeeCard;
