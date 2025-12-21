const db = require('../models');
const { Op } = require('sequelize');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await db.Employee.findAll({ where: { managerId: req.user.id } });
        const message = employees.length > 0 ? "Employees fetched successfully" : "No employees found";
        return res.status(200).json({ message, employees });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to fetch employees" });
    }
}

const createEmployee = async (req, res) => {
    try {
        const t = await db.sequelize.transaction();
        const { name, email, userName, password } = req.body;
        if (!name || !email || !userName || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingEmployee = await db.Employee.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { userName: userName }
                ]
            }
        });
        if (existingEmployee) {
            return res.status(400).json({ error: "Employee with this email or the userName already exists" });
        }
        const newEmployee = await db.Employee.create({
            name, email, userName,
            password, managerId: req.user.id
        }, { transaction: t });
        await db.Manager.increment('numOfEmployees', { by: 1, where: { id: req.user.id } }, { transaction: t });
        await t.commit();
        return res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    }
    catch (err) {
        console.error("Create employee error:", err);
        return res.status(500).json({ error: "Failed to create employee", details: err.message });
    }
}
const getEmployeeById = async (req, res) => {
    try {
        const { empId } = req.params;
        const employee = await db.Employee.findOne({ where: { id: empId, managerId: req.user.id } });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found or not authorized" });
        }
        if (req.user.id !== employee.managerId) {
            return res.status(403).json({ error: "You are not authorized to access this employee's details" });
        }
        return res.status(200).json({ message: "Employee details fetched successfully", employee });
    }
    catch (err) {
        //ERROR DETAILS
        return res.status(500).json({ error: "Failed to fetch employee details", details: err.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { empUserName } = req.body;
        const employee = await db.Employee.findOne({ where: { userName: empUserName } });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        if (employee.managerId !== req.user.id) {
            return res.status(403).json({ error: "You are not authorized to delete this employee" });
        }
        await db.Employee.destroy({ where: { userName: empUserName } });
        return res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to delete employee" });
    }
}

const modifyEmployee = async (req, res) => {
    try {
        const { empId } = req.params;
        const employee = await db.Employee.findOne({ where: { id: empId, managerId: req.user.id } });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found or not authorized" });
        }
        if (req.user.id !== employee.managerId) {
            return res.status(403).json({ error: "You are not authorized to modify this employee" });
        }
        await db.Employee.update(req.body, { where: { id: empId } });
        return res.status(200).json({ message: "Employee modified successfully" });
    }
    catch (err) {
        //ERROR DETAILS
        return res.status(500).json({ error: "Failed to modify employee", details: err.message });
    }
}


module.exports = {
    getAllEmployees,
    createEmployee,
    deleteEmployee,
    getEmployeeById,
    modifyEmployee
}