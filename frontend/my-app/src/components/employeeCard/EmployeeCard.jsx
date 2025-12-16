import React, { useState } from 'react';
import './EmployeeCard.css';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });

    return (
        <div className="employee-card">
            <div className="employee-info">
                <h3>Name: {employee.name}</h3>
                <p>User Name: {employee.userName}</p>
                <p>ID: {employee.id}</p>
                <p className="email">Email: {employee.email}</p>
            </div>
            <div className="employee-actions">
                <button className="btn-edit" onClick={() => setIsEditing(true)}>Modify</button>
                <button className="btn-delete" onClick={() => onDelete(employee.userName)}>Delete</button>
            </div>
            {isEditing && (
                <div className="employee-edit">
                    <input
                        type="text"
                        value={editedEmployee.name}
                        onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedEmployee.userName}
                        onChange={(e) => setEditedEmployee({ ...editedEmployee, userName: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedEmployee.id}
                        onChange={(e) => setEditedEmployee({ ...editedEmployee, id: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editedEmployee.email}
                        onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
                    />
                    <button className="btn-save" onClick={() => onEdit(editedEmployee)}>Save</button>
                    <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeCard;
