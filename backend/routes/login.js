const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//manager login
router.post("/manager", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing Field. All fields are required" })
        }
        const manager = await db.Manager.findOne({ where: { email } });
        if (!manager) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        const token = jwt.sign({ id: manager.id, name: manager.name, role: "manager" }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.status(200).json({ message: "Login successful", token })


    }
    catch (err) {
        return res.status(500).json({ error: "Login failed" })
    }
})
// employee login
router.post("/employee", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing Field. All fields are required" })
        }
        const employee = await db.employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        const token = jwt.sign({ id: employee.id, name: employee.name, role: "employee" }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.status(200).json({ message: "Login successful", token })

    }
    catch (err) {
        return res.status(500).json({ error: "Login failed" })
    }
})

module.exports = router;