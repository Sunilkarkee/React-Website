import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import Allusers from "../pages/Allusers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home />
            },
            {
                path:"login",
                element:<Login />
            },
            {
                path:"forgot-password",
                element:<ForgotPassword />
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },

            {
                path: "category-product",
                element: <CategoryProduct/>
            },

            {
                path:"product-details/:id",
                element: <ProductDetails />
            },

            {
                path:"admin-panel",
                element:<AdminPanel/>
            },
            
            {
                path:"cart",
                element:<Cart/>
            },

            {
                path:"search",
                element:<SearchProduct/>
            },
            
            
            {
                path:"admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path: "all-users",
                        element: <Allusers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                ]
            },
        ]
    }
])

export default router
