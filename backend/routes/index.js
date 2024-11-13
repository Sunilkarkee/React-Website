const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/user/userDetails')
const userLogoutController = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const uploadProductController = require('../controller/product/uploadProduct')
const getAllProductController = require('../controller/product/getAllProducts')
const updateProductController = require('../controller/product/updateProduct')
const getProductCategory = require('../controller/product/getCategory')
const getCatWiseProducts = require('../controller/product/getCatWiseProducts')
const getProductDetails = require('../controller/product/getProductDetails')
const userCartController = require('../controller/user/userCartController')
const cartProductsCounter = require('../controller/user/cartProductCounter')
const cartproductsDisplay = require('../controller/user/cartProductsDisplay')
const cartProductAdd = require('../controller/user/cartProductAdd')
const cartProductDelete = require('../controller/user/deleteCartProduct')
const productSearchController = require('../controller/product/productSearch')
const filterProductController = require('../controller/product/filterProduct')

router.post("/signup",userSignUpController)

router.post("/signin", userSignInController)

router.get("/user-details", authToken, userDetailsController)

router.get("/userLogout", userLogoutController)



//admin panel

router.get("/all-users", authToken, allUsers)
router.post("/update-user",authToken, updateUser)

//products upload 
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-products", getAllProductController)

// product update

router.post("/product-update", authToken, updateProductController )

//product fetch

router.get("/get-productbyCategory", getProductCategory)

router.post("/catwise-products", getCatWiseProducts)

router.post("/product-details", getProductDetails)

// user cart 

router.post("/user-cart", authToken, userCartController)
router.get("/cartProduct-counter", authToken,cartProductsCounter)

// user cart products display

router.get("/cart-products", authToken, cartproductsDisplay)

// cart item addition
router.post("/cartItem-add",authToken, cartProductAdd)

// cart-item deletion
router.post("/cartItem-delete",authToken,cartProductDelete)

// product Search
router.get("/product-search",productSearchController)

// filter product
router.post("/filter-product", filterProductController)

module.exports = router
