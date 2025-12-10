const express = require('express');
const router = express.Router();
const db = require("../models");


router.post("/", async (req, res) => {
try{
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
   return res.status(500).json({error:"Signup failed"})}

})

module.exports = router;