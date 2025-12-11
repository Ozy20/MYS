const express = require('express');
const router = express.Router();
const db = require("../models");
const validateManager = require("../utils/ajvManagerValidator").validateManager;

router.post("/", async (req, res) => {
try{
    const validationResult = validateManager(req.body);
    if(!validationResult.valid){
        return  res.status(400).json({error:"Invalid data", details: validationResult.errors})
    }
    const { name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"Missing Field. All fields are required"})
    }
    const existingUser = await db.Manager.findOne({where:{email}});
    if(existingUser){
        return res.status(400).json({error:"Email already in use"})
    }
    const newManager = await db.Manager.create({name, email, password});
    return res.status(201).json({message:"Signup successful", managerId:newManager.id})
}
catch(err){
   console.error("Signup error:", err);
   return res.status(500).json({error:"Signup failed", details: err.message})}

})

module.exports = router;