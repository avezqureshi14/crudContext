import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Update = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const productId = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(ProductContext);
  const { user } = useAuthContext();
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:8800/products/${productId.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Include the user's token in the header
            },
          }
        );
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [productId.id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, description, image };
    try {
      const response = await axios.put(
        `http://localhost:8800/products/${productId.id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the user's token in the header
          },
        }
      );
      const updatedProduct = response.data; // Assuming the response contains the updated product data

      // Dispatch the "UPDATE_PRODUCT" action with the updated product data
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });

      // Redirect to the home page after successful submission
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label htmlFor="image">Image URL:</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default Update;
