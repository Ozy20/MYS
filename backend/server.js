// environment setup
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
// const { pool } = require("./database/dbTest.js")
const db = require("./models")

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
//test to get all tables in database
app.get("/tables", async (req, res) => {
    
    // 1. Query to get the list of all base table names in the 'public' schema
    const tableNamesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE';
    `;

    // The final result object will store all table details
    const allTableDetails = {};

    try {
        // Execute the first query to get the names
        const tablesResult = await db.sequelize.query(tableNamesQuery, {
            type: db.sequelize.QueryTypes.SELECT
        });
        
        const tableNames = tablesResult.map(t => t.table_name);

        // 2. Loop through each table name to get its column information
        for (const tableName of tableNames) {
            
            // Query to get column details for the current table
            const columnsQuery = `
                SELECT 
                    column_name,
                    data_type,
                    is_nullable,
                    column_default
                FROM 
                    information_schema.columns 
                WHERE 
                    table_schema = 'public' 
                    AND table_name = :tableName
                ORDER BY 
                    ordinal_position;
            `;

            const columns = await db.sequelize.query(columnsQuery, {
                // Use the table name as a replacement for security (prevents SQL injection)
                replacements: { tableName: tableName },
                type: db.sequelize.QueryTypes.SELECT
            });
            
            // Store the results in the final object
            allTableDetails[tableName] = {
                columns: columns
            };
        }

        // 3. Send the comprehensive result
        res.status(200).send({
            count: tableNames.length,
            message: "Successfully retrieved detailed schema information for all tables.",
            data: allTableDetails
        });

    } catch (error) {
        console.error("Error retrieving table details:", error);
        res.status(500).send({ message: "Internal server error during DB schema retrieval." });
    }
});


// routes

db.sequelize.sync().then(()=>{
    console.log("Database synchronized")
    app.listen(PORT, () => {
    console.log(`Hello, day 3 of dev,running on port ${PORT}`)
})
}).catch((err)=>{
    console.error("Error synchronizing database:", err)
})