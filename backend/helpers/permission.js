const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return false;
        }
        if (user.role === 'ADMIN') {
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}: ${error.message}`);
        return false;
    }
};

module.exports = uploadProductPermission;
