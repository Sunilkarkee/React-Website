import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import summaryApi from '../common';
import ProductCard from '../components/ProductCard';

const SearchProduct = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  // Get the query parameter 'q' from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  const fetchProduct = async () => {
    if (query) {
      setLoading(true);
      setError(null); 
      try {
        const response = await fetch(`${summaryApi.productSearch.url}?q=${query}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setSearchData(responseData?.data || []); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-xl font-semibold text-center text-green-500'>loading...</p>
        )
      }
      {
        error && (
          <p className='text-lg font-semibold text-center text-red-500'>{error? error : " Something went wrong..."}</p>
        )
      }
      <p className='text-lg my-2 font-semibold'>Searched Products: {searchData.length}</p> 
      {
        searchData.length ===0 && !loading &&(
          <p>Searched Products not available...</p>
        )
      }

      {
        searchData.length !==0 && !loading && (
          <ProductCard loading={loading} data={searchData}/>
        )
      }
    </div>
  );
}

export default SearchProduct;
