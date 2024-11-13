const cartProductsModel = require("../../models/cartProductsModel");

const userCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;  // Use req.userId directly

        if (!productId || !userId) {
            return res.status(400).json({
                message: "Product ID or User ID is missing",
                success: false,
                error: true
            });
        }

        // Check if the product is already added by the current user
        const isProductAlreadyAdded = await cartProductsModel.findOne({ productId, userId });

        if (isProductAlreadyAdded) {
            return res.status(400).json({
                message: "Product is already added to the cart",
                success: false,
                error: true
            });
        }

        // Payload for new cart entry
        const payload = {
            productId: productId,
            quantity: 1,
            userId: userId,
        };

        // Save new product to cart
        const addToCart = new cartProductsModel(payload);
        const savedProduct = await addToCart.save();

        return res.status(200).json({
            data: savedProduct,
            message: "Product added to cart successfully",
            error: false,
            success: true
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || "An error occurred while adding product to cart",
            error: true,
            success: false
        });
    }
};

module.exports = userCartController;
