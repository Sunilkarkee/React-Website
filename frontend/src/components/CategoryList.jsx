import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Change to null for more precise error handling

  const categoryLoading = new Array(13).fill(null); 

  const fetchCategoryProduct = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(summaryApi.productsByCategory.url);
      const dataResponse = await response.json();
      
      if (response.ok && dataResponse.data) {
        setProductCategory(dataResponse.data);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message); // Set the error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const loadingPlaceholders = (msg) => {
    return categoryLoading.map((el, index) => (
      <div key={index + "categoryLoading"} className="flex flex-col items-center">
        <div className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse flex items-center justify-center"> {/* Center the content */}
          {msg && <p  className="animate-pulse text-center text-sm text-red-500">{msg}!</p>}
        </div>
        <div className="w-16 md:w-20 h-4 bg-slate-300 animate-pulse mt-2 rounded"></div>
      </div>
    ));
  };

  const productCategories = () => {
    return productCategory.map((productcat, index) => (
      <Link to={"/category-product?category="+productcat?.category} key={index + productcat?.category} className='cursor-pointer'>
        <div className='md:w-20 md:h-20 w-16 h-16 justify-center rounded-full overflow-hidden flex items-center p-4 bg-slate-100'>
          <img 
            src={productcat?.productImage[0]} 
            alt={productcat?.category || 'N/A'} 
            className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
          />
        </div>
        <p className='text-center text-sm md:text-base capitalize'>{productcat?.category || 'N/A'}</p>
      </Link>
    ));
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scroll-none'>

      {loading ? (
          loadingPlaceholders() 
        ) : error ? (
          loadingPlaceholders("error")
          
        ) : (
          productCategory.length > 0 ? productCategories() : <p className="text-red-500">No product categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
