const productModel = require("../../models/productModel");


const productSearchController = async (req, res) => {
    try {
       
        const query = req.query.q;

       
        if (!query || query.trim() === "") {
            console.warn("Search request received without a query.");
            return res.status(400).json({
                message: "Query parameter 'q' is required.",
                success: false,
                error: true
            });
        }

        // Create a case-insensitive regex pattern for the search
        const regex = new RegExp(query.trim(), 'i','g');

        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex },
                { description: regex }, 
                { tags: regex }
            ]
        })
        .skip(skip)
        .limit(limit);

        const totalResults = await productModel.countDocuments({
            "$or": [
                { productName: regex },
                { category: regex },
                { description: regex }, 
                { tags: regex }
            ]
        });


        if (products.length === 0) {
            return res.json({
                message: "No products found for the search query.",
                success: true,
                error: false,
                data: [],
                pagination: {
                    page,
                    limit,
                    totalResults: 0
                }
            });
        }

        return res.json({
            message: "Product search results",
            success: true,
            error: false,
            data: products,
            pagination: {
                page,
                limit,
                totalResults 
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err?.message || "An error occurred during product search.",
            error: true,
            success: false
        });
    }
};

module.exports = productSearchController;
