const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error("Password encryption error:", error);
        return null;
    }
}

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error("Password comparison error:", error);
        return false;
    }
}

module.exports = { encryptPassword, comparePassword };