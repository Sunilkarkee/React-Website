
// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const url = `https://api.cloudinary.com/v1_1/dshgixwnz/image/upload`;  // hardcoded temporarily

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product_images");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default uploadImage;
