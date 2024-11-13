import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategorywiseProduct";
import displayCurrency from "../helpers/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HzProductsCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollElement = useRef();

  const loadingList = Array.from({ length: 15 });

    // to update cart counter immidiately
    const {fetchCartProductsCount} = useContext(Context)
    const handleCartCounter = async(e,id) =>{
       await addToCart(e,id)
       fetchCartProductsCount()
    }


  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      
      if (categoryProduct?.data) {
        setData(categoryProduct?.data || []);
      } else {
        throw new Error('No products data available');  // Simulate failure if no data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scroll = (direction) => {
    const scrollAmount = 300;
    scrollElement.current.scrollTo({
      left: scrollElement.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount),
      behavior: "smooth", 
    });
  };

  const loadingPlaceholders = useMemo(() => {
    return loadingList.map((_, index) => (
      <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex" key={index}>
        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse' />
        <div className='p-4 grid w-full gap-2'>
          <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
          <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
          <div className='flex gap-3 w-full'>
            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
            <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
          </div>
          <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
        </div>
      </div>
    ));
  }, [loadingList]);

  const productCards = useMemo(() => {
    return data.map((product, index) => (
      <Link to={"product-details/"+product?._id} 
      className="w-full min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] h-36 rounded-sm shadow bg-white flex cursor-default" 
      key={index}
      >
        <div className="bg-slate-200 h-full min-w-[120px] md:min-w-[145px] p-2">
          <img
            src={product?.productImage[0] || "N/A"}
            className="h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply"
            alt={product?.productName || "Product Image"}
          />
        </div>
        <div className="p-3 grid">
          <h2 className="font-medium text-ellipsis md:text-lg text-base line-clamp-1">
            {product?.productName || "N/A"}
          </h2>
          <p className="capitalize text-slate-600">
            {product?.category || "N/A"}
          </p>
          <div className="flex flex-wrap">
            <p className="text-red-500 line-through">
              {displayCurrency(product?.price || "N/A")}
            </p>
            <p className="font-medium">
              {displayCurrency(product?.sellingPrice || "N/A")}
            </p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-sm py-1 rounded" onClick={(e)=>handleCartCounter(e,product?._id)}>Add to Cart</button>
        </div>
      </Link>
    ));
  }, [data]);

  return (
    <div className="container mx-auto px-4 my-4 relative">
      <h2 className="text-xl font-semibold py-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scroll-none transition-all" ref={scrollElement}>
        <button 
          onClick={() => scroll("left")} 
          className='hover:bg-Orange1 hover:text-white text-lg hidden md:block bg-white shadow-md rounded-full p-1 absolute left-0 z-10' 
          aria-label="Scroll Left"
           tabIndex="0"
        >
          <FaAngleLeft />
        </button>
        <button 
          onClick={() => scroll("right")} 
          className='hover:bg-Orange1 hover:text-white text-lg hidden md:block bg-white shadow-md rounded-full p-1 absolute right-0 z-10' 
          aria-label="Scroll Right"
           tabIndex="0"
        >
          <FaAngleRight />
        </button>

          {/* Display skeleton or error message if data fetching fails */}

        {loading || error ? (
          loadingPlaceholders
        ):(
          data.length > 0 ? productCards : <p className="text-red-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default HzProductsCard;
