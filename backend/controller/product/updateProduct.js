const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
    try {

        const sessionUserId = req.sessionUserId
        
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission Denied")
        }

        const { _id, ...restBody } = req.body;

        const updateProduct = await productModel.findByIdAndUpdate(_id, restBody, { new: true });

        if (!updateProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = updateProductController;
