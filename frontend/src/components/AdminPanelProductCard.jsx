import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProductDetails from "./AdminEditProductDetails";
import displayNPCurrency from "../helpers/displayCurrency";

const AdminPanelProductCard = ({ data, fetchdata }) => {
  const [editProductDetails, setEditProductDetails] = useState(false);

  return (
    <>
      <div className="relative bg-white group rounded">


        <div className="w-40 p-2">

          <div className="h-40 flex justify-center items-center w-36">
          {data?.productImage && data?.productImage.length > 0 ? (
            <img
              src={data?.productImage[0]}
              alt={data?.productName || "Product Image"}
              width={120}
              height={120}
              className="w-fit mx-auto h-full"
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
          </div>
         
        
          <div className="mt-2 ">
          <h1 className="text-ellipsis line-clamp-2 ">{data?.productName || "Unnamed Product"}</h1>
          <p className="font-semibold">
            {displayNPCurrency(data.sellingPrice)}
          </p>
          </div>

        </div>


        <div
          className="hidden bg-white absolute z-10 -right-2 -top-3 ml-auto p-2 text-lg hover:bg-Orange1 group-hover:block rounded-full cursor-pointer"
          onClick={() => setEditProductDetails(true)}
        >
          <MdEdit />
        </div>
      </div>
      <div className="z-50">
        {editProductDetails && (
          <AdminEditProductDetails
            productData={data}
            onClose={() => setEditProductDetails(false)}
            fetchdata={fetchdata}
          />
        )}
      </div>
    </>
  );
};

export default AdminPanelProductCard;
