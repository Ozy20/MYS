const isManager = (req, res, next) => {
    if (req.user && req.user.role === "manager") {
        next();
    } else {
        return res.status(403).json({ error: "Access denied. You are not authorized to perform this action." });
    }
}

module.exports = isManager;