// environment setup
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

// middlewares
app.use(express.json())

// CORS and Proxy Headers Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    if (req.method === "OPTIONS") {
        return res.sendStatus(200)
    }
    next()
})


// routes

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})