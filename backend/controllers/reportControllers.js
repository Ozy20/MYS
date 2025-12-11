const db = require('../models');

const getAllReports = async (req, res) => {
    try {
        let reports;
        
        if (req.user.role === 'manager') {
            reports = await db.Report.findAll({ 
                where: { managerId: req.user.id } 
            });
        } else if (req.user.role === 'employee') {
            reports = await db.Report.findAll({ 
                where: { employeeId: req.user.id } 
            });
        } else {
            return res.status(403).json({ error: "Invalid user role" });
        }
        
        const message = reports.length > 0 ? "Reports fetched successfully" : "No reports found";
        return res.status(200).json({ message, reports });
    }
    catch (err) {
        console.error("Fetch reports error:", err);
        return res.status(500).json({ error: "Failed to fetch reports", details: err.message });
    }
}


const getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await db.Report.findOne({ where: { id: reportId } });
        
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }
        
        if (req.user.role === 'manager' && report.managerId !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to view this report" });
        } else if (req.user.role === 'employee' && report.employeeId !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to view this report" });
        }
        
        return res.status(200).json({ message: "Report fetched successfully", report });
    }
    catch (err) {
        console.error("Fetch report error:", err);
        return res.status(500).json({ error: "Failed to fetch report", details: err.message });
    }
}

const createReport = async (req, res) => {
    try {
        if (req.user.role !== 'employee') {
            return res.status(403).json({ error: "Only employees can create reports" });
        }
        
        const { taskId, reportContent, reportSammary } = req.body;
        
        if (!taskId || !reportContent || !reportSammary) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const task = await db.Task.findOne({ where: { id: taskId, employeeId: req.user.id } });
        if (!task) {
            return res.status(404).json({ error: "Task not found or does not belong to you" });
        }
        
        const newReport = await db.Report.create({
            taskId,
            taskName: task.title,
            reportContent,
            reportSammary,
            employeeId: req.user.id,
            managerId: task.managerId,
            reportDate: new Date()
        });
        
        return res.status(201).json({ message: "Report created successfully", report: newReport });
    }
    catch (err) {
        console.error("Create report error:", err);
        return res.status(500).json({ error: "Failed to create report", details: err.message });
    }
}


module.exports = {
    getAllReports,
    getReportById,
    createReport,
    
}