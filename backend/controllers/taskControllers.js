const db = require('../models');
const getAllTasks = async (req, res) => {
    try {
        if (req.user.role == "manager") {
            const tasks = await db.Task.findAll({ where: { managerId: req.user.id } });
            const message = tasks.length > 0 ? "Tasks fetched successfully" : "No tasks found";
            return res.status(200).json({ message, tasks });
        }
        else {
            const tasks = await db.Task.findAll({ where: { employeeId: req.user.id } });
            const message = tasks.length > 0 ? "Tasks fetched successfully" : "No tasks found";
            return res.status(200).json({ message, tasks });
        }
    }
    catch (err) {
        console.error("Fetch tasks error:", err);
        return res.status(500).json({ error: "Failed to fetch tasks" });
    }
}

const assignTask = async (req, res) => {
    let t;
    try {
        t = await db.sequelize.transaction();
        const { title, description, empUserName } = req.body
        if (!title || !description || !empUserName) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const employee = await db.Employee.findOne({ where: { userName: empUserName } });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        if (employee.managerId !== req.user.id) {
            return res.status(403).json({ error: "You are not authorized to assign tasks to this employee" });
        }
        const manager = await db.Manager.findOne({ where: { id: req.user.id }, transaction: t });
        manager.numOfTasks++;
        await manager.save({ transaction: t });
        const newTask = await db.Task.create({
            title,
            description,
            empName: employee.name,
            employeeId: employee.id,
            managerId: req.user.id,
            status: "in-progress"
        }, { transaction: t });
        await t.commit();
        return res.status(201).json({ message: "Task assigned successfully", task: newTask });
    }
    catch (err) {
        console.error("Assign task error:", err);
        await t.rollback();
        return res.status(500).json({ error: "Failed to assign task", details: err.message });

    }
}

const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await db.Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        if (req.user.role === 'manager' && task.managerId !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to view this task" });
        }
        else if (req.user.role === 'employee' && task.employeeId !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to view this task" });
        }
        return res.status(200).json({ message: "Task fetched successfully", task });
    }
    catch (err) {
        console.error("Fetch task error:", err);
        return res.status(500).json({ error: "Failed to fetch task", details: err.message });
    }
}

module.exports = {
    getAllTasks,
    assignTask,
    getTaskById
}