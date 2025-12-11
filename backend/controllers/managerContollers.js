const db = require('../models');

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
const getAllTasks = async (req, res) => {
    try {
        const tasks = await db.Task.findAll({ where: { managerId: req.user.id } });
        const message = tasks.length > 0 ? "Tasks fetched successfully" : "No tasks found";
        return res.status(200).json({ message, tasks });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to fetch tasks" });
    }
}
const getAllReports = async (req, res) => {
    try {
        const reports = await db.Report.findAll({ where: { managerId: req.user.id } });
        const message = reports.length > 0 ? "Reports fetched successfully" : "No reports found";
        return res.status(200).json({ message, reports });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to fetch reports" });
    }
}

const createEmployee = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingEmployee = await db.Employee.findOne({ where: { email } });
        if (existingEmployee) {
            return res.status(400).json({ error: "Employee with this email already exists" });
        }
        const newEmployee = await db.Employee.create({ name, email, password, managerId: req.user.id });
        await db.Manager.increment('numOfEmployees', { by: 1, where: { id: req.user.id } });
        return res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to create employee" });
    }
}
const deleteEmployee = async (req, res) => {
    try {
        const { empUserName } = req.body;
        const employee = await db.Employee.findOne({ where: { name: empUserName } });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        if (employee.managerId !== req.user.id) {
            return res.status(403).json({ error: "You are not authorized to delete this employee" });
        }
        await db.Employee.destroy({ where: { name: empUserName } });
        return res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to delete employee" });
    }
}

const assignTask = async (req, res) => {
    try {
        const { title, description, empUserName } = req.body
        if (!title || !description || !empUserName) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const employee = await db.Employee.findOne({ where: { name: empUserName } });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        if (employee.managerId !== req.user.id) {
            return res.status(403).json({ error: "You are not authorized to assign tasks to this employee" });
        }
        const newTask = await db.Task.create({
            title, description,
            empId: employee.id,
            managerId: req.user.id,
            status: "pend"
        });
        return res.status(201).json({ message: "Task assigned successfully", task: newTask });
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to assign task" });

    }
}

module.exports = {
    getAllEmployees,
    getAllTasks,
    getAllReports,
    createEmployee,
    deleteEmployee,
    assignTask
}