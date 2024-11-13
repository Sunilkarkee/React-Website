const backendDomain = "http://localhost:8080";
const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "POST",
  },
  currentUser: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },
  logoutUser: {
    url: `${backendDomain}/api/userLogout`,
    method: "GET",
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "GET",
  },

  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },

  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },

  allProducts: {
    url: `${backendDomain}/api/get-products`,
    method: "GET",
  },

  updateProduct: {
    url: `${backendDomain}/api/product-update`,
    method: "post",
  },

  productsByCategory: {
    url: `${backendDomain}/api/get-productbyCategory`,
    method: "GET",
  },
  catWiseProducts: {
    url: `${backendDomain}/api/catwise-products`,
    method: "POST",
  },

  ProductDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "POST",
  },
  
  userCart: {
    url: `${backendDomain}/api/user-cart`,
    method: "POST",
  },

  cartProductCounter: {
    url: `${backendDomain}/api/cartProduct-counter`,
    method: "GET",
  },

  cartProductsDisplay: {
    url: `${backendDomain}/api/cart-products`,
    method: "GET",
  },


  cartProductsAddition: {
    url: `${backendDomain}/api/cartItem-add`,
    method: "POST",
  },
  
  cartItemDelete: {
    url: `${backendDomain}/api/cartItem-delete`,
    method: "POST",
  },
  
  productSearch: {
    url: `${backendDomain}/api/product-search`,
    method: "get",
  },

  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "POST",
  }
  
  

};

export default summaryApi;

