import React, { useEffect, useState } from "react";
import UploadProducts from "../components/UploadProducts";
import summaryApi from "../common";
import AdminPanelProductCard from "../components/AdminPanelProductCard";

const AllProducts = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const dataResponse = await fetch(summaryApi.allProducts.url, {
      method: summaryApi.allProducts.method,
    });
    const responseData = await dataResponse.json();

    setAllProducts(responseData?.data || []);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-slate-100 px-4 py-2 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-green-600 text-green-700 hover:bg-Orange1 hover:text-white py-1 px-4 transition-all rounded-full"
          onClick={() => setOpenUploadProducts(true)}
        >
          Upload Products
        </button>
      </div>

      {/* all products */}
      <div className="flex flex-wrap items-center gap-5 p-4 h-[calc(100vh-10px)] overflow-y-auto bg-green-100">
        {allProducts.map((product, index) => {
          return (
           <AdminPanelProductCard data={product} key= {index + "allProducts"} fetchdata ={fetchAllProducts}/>
          );
        })}
      </div>

      {/* upload products component  */}
      {openUploadProducts && (
        <UploadProducts onClose={() => setOpenUploadProducts(false)} fetchProductData={fetchAllProducts}/>
      )}
    </div>
  );
};

export default AllProducts;
