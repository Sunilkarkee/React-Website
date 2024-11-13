const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    // Log incoming request body
    console.log("Request Body:", req.body);

    // Extract category list from the request body
    const categoryList = req.body?.category || [];
    console.log("Category List:", categoryList);

    // Fetch products that match the given categories
    const product = await productModel.find({
      category: {
        "$in": categoryList,
      },
    });

    // Log fetched products
    console.log("Fetched Products:", product);

    // Send response
    res.json({
      data: product,
      message: "Product list retrieved",
      error: false,
      success: true,
    });

    // Log successful response
    console.log("Response Sent: Product list retrieved");
  } catch (err) {
    // Log error
    console.error("Error occurred:", err.message || err);

    // Send error response
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
