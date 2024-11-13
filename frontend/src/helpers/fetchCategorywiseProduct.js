import summaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const { url, method } = summaryApi.catWiseProducts;

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Failed to fetch category-wise products:", error);
    return null; 
  }
};

export default fetchCategoryWiseProduct;
