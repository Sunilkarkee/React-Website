
import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import displayNPCurrency from "../helpers/displayCurrency"


const ProductCard = ({loading, data=[]}) => {

    const {fetchCartProductsCount} = useContext(Context)
    const [error, setError] = useState(false);


   const handleCartCounter = async(e,id) =>{
      await addToCart(e,id)
      fetchCartProductsCount()
   }

    const loadingList = Array.from({ length: 15 });

    const loadingPlaceholders = useMemo(() => {
        return loadingList.map((_, index)=> (
          <div className="w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] rounded-sm shadow bg-white" key={index}>
            <div className="bg-slate-200 h-44 flex justify-center items-center p-2">
              <div className="bg-slate-300 h-full w-full animate-pulse" />
            </div>
            <div className="p-3 gap-3 grid">
              <div className="relative group">
                <div className="bg-slate-300 h-5 w-3/4 animate-pulse" />
              </div>
              <div className="bg-slate-300 h-4 w-1/2 animate-pulse" />
              <div className="flex gap-4">
                <div className="bg-slate-300 h-4 w-1/4 animate-pulse" />
                <div className="bg-slate-300 h-4 w-1/4 animate-pulse" />
              </div>
              <button className="bg-slate-300 h-8 w-full animate-pulse rounded" />
            </div>
          </div>
        ))
    }, [loadingList]);
    
    
      const productCards = useMemo(() => (
        data.map((product, index) => (
          <Link to={"/product-details/"+product?._id}  
          className="w-full min-w-[280px] max-w-[280px] md:min-w-[300px] md:max-w-[300px] rounded shadow bg-white cursor-default"
           key={index}
           onClick={()=> window.scrollTo({top:0, behavior:"smooth"})}
           >
            <div className="bg-slate-200 h-44 flex justify-center rounded text-center min-w-[120px] md:min-w-[145px] p-2">
              <img
                src={product?.productImage[0] || "N/A"}
                className="h-full  mix-blend-multiply object-scale-down hover:scale-110 transition-all"
                alt={product?.productName || "Product Image"}
              />
            </div>
    
            <div className="p-3 gap-3 grid">
              <div className="relative group">
                <h2 className="font-medium text-ellipsis md:text-lg text-base line-clamp-1">
                  {product?.productName || "N/A"}
                </h2>
                {product?.productName && (
                  <div className="absolute hidden group-hover:block bg-white text-black p-1 font-medium rounded shadow-lg w-max max-w-xs z-10">
                    {product.productName}
                  </div>
                )}
              </div>
              <p className="capitalize text-slate-600">{product?.category || "N/A"}</p>
              <div className="flex gap-4">
                <p className="text-red-500 line-through">
                  {displayNPCurrency(product?.price || "N/A")}
                </p>
                <p className="font-medium">
                  {displayNPCurrency(product?.sellingPrice || "N/A")}
                </p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-sm py-1 rounded" onClick={(e)=>handleCartCounter(e, product?._id)}>Add to Cart</button>
            </div>
          </Link>
        ))
      ), [data]);
    
  return (

    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))]  md:gap-6 overflow-x-scroll scroll-none transition-all justify-center  md:justify-start gap-6 ">
        

    {loading || error ? (
      loadingPlaceholders
    ) : (
      data.length > 0 ? productCards : <p className="text-red-500">No products available.</p>
    )}
  </div>
  )
}

export default ProductCard