import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayNPCurrency from "../helpers/displayCurrency";
import RecomendedProductsDisplay from "../components/RecomendedProductsDisplay";
import addToCart from "../helpers/addToCart";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    price: "",
    sellingPrice: "",
    productDescription: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImagesLoading = new Array(5).fill(null);

  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [imageCordinate, setImageCoordinate] = useState({ x: 0, y: 0 });

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.ProductDetails.url, {
      method: summaryApi.ProductDetails.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setLoading(false);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  const handleMouseHoverOverProduct = (img) => {
    setActiveImage(img);
  };

  const handleMouseEnter = (e) => {
    setZoomImage(true);

    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setImageCoordinate({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomImage(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleAddToCart =async(e,id)=>{
    await addToCart(e,id)
  }

  return (
    <div className="container mx-auto p-4">

      <div className="min-h-[200px] min-w-[200px] flex flex-col lg:flex-row gap-4">

        {/* Product Images */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 p-1 relative">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />

            {/* Product image zoom */}
            {zoomImage && (
              <div className="hidden md:block lg:block overflow-hidden z-10 absolute min-w-[500px] min-h-[400px] top-0 right-[-510px]">
                <div
                  className="w-full h-full min-w-[500px] min-h-[400px] p-2"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${imageCordinate.x * 100}% ${imageCordinate.y * 100}%`,
                    backgroundSize: "250%",
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="h-full flex gap-2 lg:flex-col overflow-scroll scroll-none">
                {productImagesLoading.map((_, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 animate-pulse rounded bg-slate-400"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="h-full flex gap-2 lg:flex-col overflow-scroll scroll-none">
                {data.productImage && data.productImage.length > 0 ? (
                  data?.productImage?.map((img, index) => (
                    <div className="h-20 w-20 bg-slate-200 rounded  p-1" key={index}>
                      <img
                        src={img}
                        alt={`Product ${index}`}
                        className={`w-full  h-full mix-blend-multiply object-scale-down cursor-pointer ${
                          img === activeImage ? "active-image" : ""
                        }`}
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                        onMouseEnter={() => handleMouseHoverOverProduct(img)}
                        onClick={() => handleMouseHoverOverProduct(img)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="flex mt-3 flex-col gap-1 w-full">
            <p className="bg-slate-400 animate-pulse h-6 lg:h-8 rounded inline-block px-5 py-2 w-[50%]"></p>
            <h2 className="h-6 lg:h-8 rounded bg-slate-400 animate-pulse"></h2>
            <p className="animate-puls h-6 lg:h-8 bg-slate-400 min-w[100px]"></p>

            {/* for rating */}
            <div className="animate-pulse h-6 lg:h-8 bg-slate-400 flex items-center gap-1"></div>

            <div className="flex items-center gap-4 my-1 text-xl font-medium h-6 lg:h-8 animate-pulse">
              <p className="w-full text-slate-500 h-full line-through bg-slate-400"></p>
              <p className="h-full w-full bg-slate-400"></p>
            </div>

            <div className="flex items-center gap-3 ">
              <button className="bg-slate-400 animate-pulse h-6 lg:h-8 rounded "></button>
              <button className="bg-slate-400 animate-pulse h-6 lg:h-8 rounded"></button>
            </div>

            <div>
              <p className="bg-slate-400 animate-pulse h-6 lg:h-8 rounded w-[50%]"></p>
              <p className="text-justify bg-slate-400 animate-pulse h-24 lg:h-28 rounded mt-1"></p>
            </div>
          </div>
        ) : (
          <div className="flex  flex-col gap-1">
            <p className="text-lg bg-blue-200 rounded text-red-700 font-semibold inline-block px-2 w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-3xl font-medium">{data?.productName}</h2>
            <p className="capitalize text-slate-600"> {data?.category}</p>

            {/* for rating */}
            <div className="text-green-700 text-xl flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStarHalfStroke />
            </div>

            <div className="flex items-center gap-4 my-1 text-xl font-medium">
              <p className="text-slate-500 line-through">
                {displayNPCurrency(data?.price || "N/A")}
              </p>
              <p>{displayNPCurrency(data?.sellingPrice || "N/A")}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button className="border-2 px-3 py-1 min-w-[120px] hover:bg-green-600 hover:text-white font-medium bg-green-500 rounded-md hover:border-green-600">
                Buy Now
              </button>
              <button className="border-2 px-3 py-1 min-w-[120px] hover:bg-blue-600 hover:text-white font-medium bg-blue-500 rounded-md hover:border-green-600"
              onClick={(e)=>handleAddToCart(e, data._id)}
              >
                Add To Cart
              </button>
            </div>

            <div className="h-full ">
              <p className="text-slate-700 text-lg font-medium mt-1">Description:</p>
              <p className="text-justify text-ellipsis line-clamp-6 overflow-y-scroll scroll-none">{data?.productDescription}</p>
            </div>
          </div>
        )}
      </div>

  
     {
          data.category && (
            <RecomendedProductsDisplay category={data?.category} heading={"Recomended"} />
          )
        }
     </div>

  
  );
};

export default ProductDetails;
