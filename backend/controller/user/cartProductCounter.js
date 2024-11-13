const cartProductsModel = require("../../models/cartProductsModel");

const cartProductsCounter = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("User ID from request:", userId);

        // Validate if userId exists
        if (!userId) {
            console.log("User ID not provided");
            return res.status(400).json({
                message: "User ID not provided",
                error: true,
                success: false,
            });
        }

        console.log("Counting cart products for user:", userId);

        const count = await cartProductsModel.countDocuments({ userId: userId });

        // Log the count for debugging
        console.log("Cart product count:", count);

        // Since count will always be a number, we can return it directly
        return res.status(200).json({
            data: { count: count },
            message: "Product count retrieved successfully",
            error: false,
            success: true,
        });

    } catch (err) {
        console.error("Error counting cart products:", err); // Log error details
        return res.status(500).json({
            message: err.message || "An error occurred while counting cart products",
            error: true,
            success: false,
        });
    }
};

module.exports = cartProductsCounter;
