const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskControllers');
const reportControllers = require('../controllers/reportControllers');
const verifyToken = require('../middlewares/verifyToken');

router.get('/tasks', verifyToken, taskControllers.getAllTasks);
router.get('/tasks/:taskId', verifyToken, taskControllers.getTaskById);
router.get('/reports', verifyToken, reportControllers.getAllReports);
router.get('/reports/:reportId', verifyToken, reportControllers.getReportById);
router.post('/reports/create', verifyToken, reportControllers.createReport);

module.exports = router;