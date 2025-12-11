const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers("authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Routing not allowed. No token provided" });

    }
    try{
        const payload = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch(err){
        return res.status(401).json({ error: "Invalid token" });
    }
}
module.exports = verifyToken;
