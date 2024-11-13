const productModel = require("../../models/productModel");

const getProductCategory = async (req, res) => {


  try {
     
    const productCategory = await productModel.distinct("category")

    const productByCategory = []

    for(const category of productCategory){
        const product = await productModel.findOne({category})

        if(product){
            productByCategory.push(product)
        }
    }

    res.json({
        message: "category products",
        error: false,
        success: true,
        data : productByCategory
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductCategory