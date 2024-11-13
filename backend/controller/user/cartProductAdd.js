const cartProductsModel = require("../../models/cartProductsModel");

const cartProductAdd = async (req, res) => {
  try {
   
    
    const currentUserId = req.userId;
    const productIdToAdd = req.body._id;
    const pqty = req.body.quantity;

  

    const updateProduct = await cartProductsModel.updateOne(
      { _id: productIdToAdd, userId: currentUserId }, 
      { $set: { quantity: pqty } }
    );

    

    if (updateProduct.matchedCount === 0) {
      return res.json({
        message: "No matching product found for update",
        success: false,
      });
    }

    if (updateProduct.modifiedCount === 0) {
      return res.json({
        message: "Product quantity was not modified",
        success: false,
      });
    }

  

    res.json({ 
      message: "Product quantity updated successfully",
      success: true,
      data: updateProduct, 
    });

  } catch (err) {
    

    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = cartProductAdd;
