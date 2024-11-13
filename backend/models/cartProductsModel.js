const mongoose = require('mongoose');

// Define the schema
const cartProducts= new mongoose.Schema({
    productId: {
        ref : "product",
        type: String,
    },
    quantity: Number,
    userId: String,
    
},{timestamps: true})
    

// Create the model
const cartProductsModel = mongoose.model("CartProducts", cartProducts);  

module.exports = cartProductsModel;