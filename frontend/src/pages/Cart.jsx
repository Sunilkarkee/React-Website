import React, { useContext, useEffect, useState } from "react";
import summaryApi from "../common";
import Context from "../context";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import displayNPCurrency from "../helpers/displayCurrency";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.cartProductsDisplay.url, {
        method: summaryApi.cartProductsDisplay.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItemQuantity = async (id, pqty) => {
    try {
      const response = await fetch(summaryApi.cartProductsAddition.url, {
        method: summaryApi.cartProductsAddition.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: pqty + 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setData((prevData) =>
          prevData.map((product) =>
            product._id === id ? { ...product, quantity: pqty + 1 } : product
          )
        );
      }
    } catch (error) {
      console.error("Error adding item quantity:", error);
    }
  };

  const removeItemQuantity = async (id, pqty) => {
    if (pqty > 1) {
      try {
        const response = await fetch(summaryApi.cartProductsAddition.url, {
          method: summaryApi.cartProductsAddition.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: pqty - 1,
          }),
        });

        const responseData = await response.json();

        if (responseData.success) {
          setData((prevData) =>
            prevData.map((product) =>
              product._id === id ? { ...product, quantity: pqty - 1 } : product
            )
          );
        }
      } catch (error) {
        console.error("Error removing item quantity:", error);
      }
    }
  };

  const deletCartItem = async (id) => {
    try {
      const response = await fetch(summaryApi.cartItemDelete.url, {
        method: summaryApi.cartItemDelete.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setData((prevData) => prevData.filter((product) => product._id !== id));
        context.fetchCartProductsCount();
      } else {
        console.error("Failed to delete product:", responseData.message);
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  const totalQuantity = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center my-3">
        {data.length === 0 && !loading && (
          <p className="font-medium text-lg py-4 shadow-md">
            No Products available in your cart!
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          <div>
            {loading
              ? loadingCart.map((el, index) => (
                  <div
                    key={index}
                    className="w-full bg-slate-400 h-32 my-2 rounded animate-pulse"
                  ></div>
                ))
              : data.map((product) => (
                  <div
                    key={product?._id + "cart loading"}
                    className="w-full bg-white h-32 my-2 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full mix-blend-multiply object-scale-down"
                      />
                    </div>

                    <div className="px-4 py-2 relative">
                      <div className="absolute right-2  bg-blue-500 rounded-full h-8 w-8 text-center justify-center  flex ">
                        <button
                          onClick={() => deletCartItem(product?._id)}
                          className="text-white text-2xl hover:text-red-700"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>

                      <h2 className="font-medium text-lg lg:text-xl">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-600 text-base lg:text-lg">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="capitalize text-black text-base lg:text-lg">
                          {displayNPCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="capitalize text-black text-base lg:text-lg">
                          <span className="font-semibold">
                            Total:&nbsp;&nbsp;&nbsp;
                          </span>
                          {displayNPCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <button
                          className="w-8 h-6 rounded border text-red-500 hover:bg-blue-500 hover:text-white border-blue-500 justify-center items-center text-xl flex"
                          onClick={() =>
                            removeItemQuantity(product?._id, product?.quantity)
                          }
                        >
                          <FiMinus />
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="w-8 h-6 rounded border text-black hover:bg-blue-500 hover:text-white border-blue-500 justify-center items-center flex text-xl"
                          onClick={() =>
                            addItemQuantity(product?._id, product?.quantity)
                          }
                        >
                          <IoMdAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="mt-5 py-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-40 bg-slate-400 animate-pulse rounded"></div>
          ) : (
            <div className="h-40 bg-white rounded shadow-md">
              <h2 className="bg-blue-500 text-white font-semibold text-lg px-4 py-2 rounded-t-md">
                Summary
              </h2>

              <div className="mt-2 px-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">Quantity</p>
                  <p>{totalQuantity}</p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <p className="font-medium">Total Amount</p>
                  <p>{displayNPCurrency(totalPrice)}</p>
                </div>
              </div>

              <div className="text-center mt-2">
                <button className="bg-green-500 text-white font-medium py-2 px-6 rounded-full hover:bg-green-600">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
