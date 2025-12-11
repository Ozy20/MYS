const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isManager = require('../middlewares/isManager');
const managerControllers = require('../controllers/managerContollers');

//get all employees
router.get('/employees', verifyToken, isManager, managerControllers.getAllEmployees);
//get all tasks
router.get('/tasks', verifyToken, managerControllers.getAllTasks);
//get all reports
router.get('/reports', verifyToken,isManager ,managerControllers.getAllReports);

//create employee
router.post('/create-employee', verifyToken, isManager, managerControllers.createEmployee);
//delete employee
router.delete('/delete-employee', verifyToken, isManager, managerControllers.deleteEmployee);
//assign task
router.post('/assign-task', verifyToken, isManager, managerControllers.assignTask);