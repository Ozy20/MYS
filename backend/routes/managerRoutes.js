const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isManager = require('../middlewares/isManager');
const managerControllers = require('../controllers/managerContollers');
const reportControllers = require('../controllers/reportControllers');
const taskControllers = require('../controllers/taskControllers');
///employees
//get all employees
router.get('/employees', verifyToken, isManager, managerControllers.getAllEmployees);
//create employee
router.post('/create-employee', verifyToken, isManager, managerControllers.createEmployee);
//delete employee
router.delete('/delete-employee', verifyToken, isManager, managerControllers.deleteEmployee);
//get employee by id
router.get('/employee/:empId', verifyToken, isManager, managerControllers.getEmployeeById);
///reports
//get all reports
router.get('/reports', verifyToken, isManager, reportControllers.getAllReports);
//get report by id
router.get('/reports/:reportId', verifyToken, isManager, reportControllers.getReportById);
////tasks
//get all tasks
router.get('/tasks', verifyToken, isManager, taskControllers.getAllTasks);
//get task by id
router.get('/tasks/:taskId', verifyToken, isManager, taskControllers.getTaskById);
//assign task
router.post('/assign-task', verifyToken, isManager, taskControllers.assignTask);
//modify employee
router.put('/modify-employees/:empId', verifyToken, isManager, managerControllers.modifyEmployee);
module.exports = router;