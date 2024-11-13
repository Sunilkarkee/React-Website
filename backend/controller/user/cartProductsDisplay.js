const cartProductsModel = require("../../models/cartProductsModel");

const cartproductsDisplay = async (req, res) => {
    try {
        const currentUser = req.userId; 

       
        if (!currentUser) {
            return res.status(400).json({
                message: "User ID not provided",
                error: true,
                success: false,
            });
        }

        const allCartProducts = await cartProductsModel.find({
            userId: currentUser, 
        }).populate("productId");

       
        return res.status(200).json({
            message: "Products retrieved successfully",
            error: false,
            success: true, 
            data: allCartProducts,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "An error occurred while retrieving cart products",
            error: true,
            success: false,
        });
    }
};

module.exports = cartproductsDisplay
