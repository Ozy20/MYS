// environment setup
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const db = require("./models")
//const getAllManagers = require("./database_test/allManagers.js")
const loginRoutes = require("./routes/login.js")
const signupRoutes = require("./routes/signup.js")
const managerRoutes = require("./routes/managerRoutes.js")
// middlewares
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    if (req.method === "OPTIONS") {
        return res.sendStatus(200)
    }
    next()
})
//test to get all managers in database

// routes
app.use("/login", loginRoutes)
app.use("/signup", signupRoutes)
app.use("/manager", managerRoutes)

db.sequelize.sync().then(()=>{
    console.log("Database synchronized")
    app.listen(PORT, () => {
    console.log(`Hello, day 3 of dev,running on port ${PORT}`)
})
}).catch((err)=>{
    console.error("Error synchronizing database:", err)
})