const cartProductsModel = require("../../models/cartProductsModel");

const cartProductDelete = async (req, res) => {
  try {
    const currentUserId = req.userId; 
    const productIdToDelete = req.body._id; 

    const deleteProduct = await cartProductsModel.deleteOne({
      _id: productIdToDelete,
      userId: currentUserId,
    });

    if (deleteProduct.deletedCount === 0) {
      return res.json({
        message: "No matching product found for deletion",
        success: false,
      });
    }

    return res.json({
      message: "Product deleted successfully from cart",
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = cartProductDelete;
