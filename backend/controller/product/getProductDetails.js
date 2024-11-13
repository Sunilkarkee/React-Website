const productModel = require("../../models/productModel")
const getProductDetails= async(req, res)=>{
    try{

        const {productId} = req.body

        const product = await productModel.findById(productId)

        res.json({
            message: "product Found",
            error : false,
            success : true,
            data: product
        })

    }catch(err){
        res.json({
            message: err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetails