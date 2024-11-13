import React, { useState, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { ImFolderUpload } from "react-icons/im";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDeleteForever } from "react-icons/md";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

const UploadProducts = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,

    productName: productData?.productName || "N/A",
    brandName: productData?.brandName || "N/A",
    category: productData?.category
      ? { value: productData.category, label: productData.category }
      : null, // Use null if there's no category
    productImage: productData?.productImage || [],
    price: productData?.price || "",
    sellingPrice: productData?.sellingPrice || "",
    productDescription: productData?.productDescription || "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Callback to handle dropped files
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setIsUploading(true);
      try {
        const file = acceptedFiles[0];
        const uploadImageToCloudinary = await uploadImage(file);
        setData((prev) => ({
          ...prev,
          productImage: [...prev.productImage, uploadImageToCloudinary.url],
        }));
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image.");
      } finally {
        setIsUploading(false);
      }
    }
  }, []);

  // Use react-dropzone for drag-and-drop functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setData((prev) => ({
      ...prev,
      category: selectedOption, // Save selected category object
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
    toast.info("Image removed.");
  };

  // Form validation
  const validateForm = () => {
    if (
      !data.productName ||
      !data.category ||
      !data.price ||
      data.productImage.length === 0
    ) {
      toast.error(
        "Please fill all required fields and upload at least one image."
      );
      return false;
    }
    return true;
  };

  // Form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataResponse = await fetch(summaryApi.updateProduct.url, {
        method: summaryApi.updateProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          category: data.category.value, // Send the category value
        }),
      });

      const responseData = await dataResponse.json();
      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchdata();
      } else {
        toast.error(responseData.message || "Error occurred while uploading.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex relative justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Edit Product Details</h2>
          <div
            className="text-2xl absolute bottom-5 -right-4  cursor-pointer text-white hover:bg-blue-700 hover:text-black rounded-full bg-blue-500"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>

        <form
          className="grid gap-4 overflow-y-auto pr-5 max-h-[70vh]"
          onSubmit={handleFormSubmit}
        >
          {/* Product Name */}
          <div>
            <label className="font-medium" htmlFor="productName">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              placeholder="Enter Product Name"
              className="w-full p-2 mt-1 bg-slate-100 border rounded outline-none"
              required
            />
          </div>

          {/* Brand Name */}
          <div>
            <label className="font-medium" htmlFor="brandName">
              Brand Name:
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              placeholder="Enter Brand Name"
              className="w-full p-2 mt-1 bg-slate-100 border rounded outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium" htmlFor="category">
              Category:
            </label>
            <Select
              id="category"
              name="category"
              value={data.category} // Pass the category object here
              onChange={handleCategoryChange}
              options={productCategory.map((category) => ({
                value: category.label,
                label: category.label,
              }))}
              className="w-full mt-1"
              placeholder="Select Category"
              required
            />
          </div>

          {/* Product Image Upload */}
          <div>
            <label className="font-medium" htmlFor="uploadImage">
              Product Image:
            </label>
            <div
              {...getRootProps()}
              className={`w-full h-28 p-2 mt-1 bg-slate-100 border rounded flex justify-center items-center cursor-pointer ${
                isDragActive ? "border-blue-500" : ""
              }`}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <p className="text-md text-green-400">Uploading image...</p>
              ) : (
                <div className="text-slate-500 flex flex-col items-center">
                  <ImFolderUpload className="text-3xl" />
                  <p>
                    {isDragActive
                      ? "Drop the image here..."
                      : "Drag & drop or click to upload image"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Display Uploaded Images */}
          {data.productImage.length > 0 && (
            <div className="flex items-center gap-2">
              {data.productImage.map((img, index) => (
                <div className="relative  mr-2 group" key={index}>
                  <img
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    className=" border px-2 h-28 w-24 rounded cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(img);
                    }}
                  />
                  <div
                    className="shake absolute -top-2 -right-2 cursor-pointer text-xl hover:text-black  hover:bg-blue-600 rounded-full  text-white bg-blue-500 "
                    onClick={() => handleDeleteProductImage(index)}
                  >
                    <MdDeleteForever />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price and Selling Price */}
          <div>
            <label className="font-medium" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              placeholder="Enter Product Price"
              className="w-full p-2 mt-1 bg-slate-100 border rounded outline-none"
              required
            />
          </div>

          <div>
            <label className="font-medium" htmlFor="sellingPrice">
              Selling Price:
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleOnChange}
              placeholder="Enter Selling Price"
              className="w-full p-2 mt-1 bg-slate-100 border rounded outline-none"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="font-medium" htmlFor="productDescription">
              Product Description:
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={data.productDescription}
              onChange={handleOnChange}
              placeholder="Enter Product Description"
              className="w-full p-2 mt-1 bg-slate-100 border rounded outline-none"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Update
          </button>
        </form>

        {/* Display Full-Screen Image Modal */}
        {openFullScreenImage && (
          <DisplayImage
            imgUrl={fullScreenImage}
            onClose={() => setOpenFullScreenImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProducts;
