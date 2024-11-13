const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    brandName: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        maxlength: [50, "Brand name cannot exceed 50 characters"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        // enum: ['Electronics', 'Fashion', 'Health', 'Home', 'Sports', 'Beauty'], // Example categories
        trim: true
    },
     productImage: [
    // {
    //     url: {
    //         type: String,
    //         required: [true, "Image URL is required"]
    //     },
    //     title: {
    //         type: String,
    //         trim: true
    //     }

    // }
    ],
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    sellingPrice: {
        type: Number,
        required: [true, "Selling price is required"],
        min: [0, "Selling price cannot be negative"]
    },
    productDescription: {
        type: String,
        maxlength: [1000, "Product description cannot exceed 1000 characters"]
    },
    slug: {
        type: String,
        unique: true,
        trim: true
    }
}, { timestamps: true });

productSchema.index({ productName: "text", category: "text" });

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
