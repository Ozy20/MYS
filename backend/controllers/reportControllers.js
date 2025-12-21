const db = require('../models');
const { generateReportSummary } = require('../utils/summarize');

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
    let t;
    try {
        if (req.user.role !== 'employee') {
            return res.status(403).json({ error: "Only employees can create reports" });
        }

        const { taskId, reportContent } = req.body;

        if (!taskId || !reportContent) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Generate summary before transaction to avoid long locking if AI is slow
        let summary = "No summary";
        try {
            summary = await generateReportSummary(reportContent);
        } catch (aiError) {
            console.error("AI Summary generation failed, proceeding with default:", aiError);
        }

        t = await db.sequelize.transaction();

        const task = await db.Task.findOne({ where: { id: taskId, employeeId: req.user.id }, transaction: t });
        if (!task) {
            await t.rollback();
            return res.status(404).json({ error: "Task not found or does not belong to you" });
        }

        const newReport = await db.Report.create({
            taskId,
            taskName: task.title,
            reportContent,
            reportSammary: summary,
            employeeId: req.user.id,
            empName: req.user.name,
            managerId: task.managerId,
            reportDate: new Date()
        }, { transaction: t });

        task.status = "completed";
        await task.save({ transaction: t });

        const manager = await db.Manager.findOne({ where: { id: task.managerId }, transaction: t });
        if (manager) {
            manager.numOfReports++;
            await manager.save({ transaction: t });
        }

        await t.commit();

        return res.status(201).json({ message: "Report created successfully", report: newReport });
    }
    catch (err) {
        console.error("Create report error:", err);
        if (t) await t.rollback();
        return res.status(500).json({ error: "Failed to create report", details: err.message });
    }
}


module.exports = {
    getAllReports,
    getReportById,
    createReport,

}