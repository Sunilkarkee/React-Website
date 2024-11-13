import React, { useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import productCategory from "../helpers/productCategory";
import { useState } from "react";
import summaryApi from "../common";
import ProductCard from "../components/ProductCard";

const CategoryProduct = () => {
 

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("");

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");

  const urlCategoryListObjects = {};
  urlCategoryListArray.forEach((el) => {
    urlCategoryListObjects[el] = true;
  });

  console.log("urlcatlist", urlCategoryListArray);

  const [selectedCategory, setSelectedCategory] = useState(
    urlCategoryListObjects
  );
  const [filterCatList, setFilterCatList] = useState([]);

  const fetchData = async () => {
    console.log("fetchData is called");
    try {
      const response = await fetch(summaryApi.filterProduct.url, {
        method: summaryApi.filterProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: filterCatList,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataResponse = await response.json();

      if (dataResponse) {
        setData(dataResponse?.data);
        console.log("dataResponse", dataResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategorySelect = (e) => {
    const { name, value, checked } = e.target;

    setSelectedCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));

    console.log(
      "selected cat",
      "name:" + name,
      "value:" + value,
      "set:" + checked
    );
  };

  useEffect(() => {
    fetchData();
  }, [filterCatList]);

  useEffect(() => {
    const arryaOfCategory = Object.keys(selectedCategory)
      .map((categoryKeyName) => {
        if (selectedCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCatList(arryaOfCategory);

    //for formatting and reflecting  url changes
    const urlformat = arryaOfCategory.map((el, index) => {
      if (arryaOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/category-product?" + urlformat.join(""));
    //
  }, [selectedCategory]);


  const handleOnchangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
  
    if (value === "asc") {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
  
    if (value === "desc") {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
    if (value === "newest") {
      setData((prev) => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  };
  

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/* for desktop */}
      <div className="hidden md:grid lg:grid grid-cols-[200px,1fr]  gap-8">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-100px)] overflow-y-scroll scroll-none">
          {/* sort by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 shadow">
              Sort By
            </h3>

            <form>
              <div className="text-sm flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === "asc"}
                    onChange={handleOnchangeSortBy}
                    value={"asc"}
                  />
                  <label>Price - low to high</label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === "desc"}
                    onChange={handleOnchangeSortBy}
                    value={"desc"}
                  />
                  <label>Price - high to low</label>
                </div>

                <div className="flex items-center gap-3">
                  <input type="radio" name="sortBy" 
                  checked={sortBy === "newest"}
                  onChange={handleOnchangeSortBy}
                  value={"newest"}
                  />
                  <label>Newest first</label>
                </div>


              </div>
            </form>
          </div>

          {/* filter by */}
          <div className="mt-4">
            <h3 className="text-base uppercase font-medium text-slate-500 shadow">
              Category
            </h3>

            <form>
              <div className="text-sm flex flex-col gap-2 mt-2">
                {productCategory.map((categoryName, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      id={categoryName?.label}
                      value={categoryName?.label}
                      checked={selectedCategory[categoryName?.label]}
                      onChange={handleCategorySelect}
                    />
                    <label htmlFor={categoryName?.label}>
                      {categoryName?.label}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* right side l-4*/}
        <div className="min-h-[calc(100vh-120px)] overflow-y-scroll scroll-none max-h-[calc(100vh-120px)]">
          <h2 className="pb-3 text-green-700 font-semibold text-lg" >Total found:{data.length} </h2>
          <div>
          {data.length !== 0 && <ProductCard data={data} loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
