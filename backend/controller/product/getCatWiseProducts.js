const productModel = require("../../models/productModel");

const getCatWiseProducts = async(req,res) =>{
    try{
        const  { category} = req?.body
        const product = await productModel.find({category})
        res.json({
            data: product,
            message : "products",
            success: true,
            error: false
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = getCatWiseProducts