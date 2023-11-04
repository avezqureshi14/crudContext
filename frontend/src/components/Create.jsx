import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from "../hooks/useProductsContext";

const Create = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const { products, dispatch } = useProductsContext();


  const handleSubmit = async (e) => {
  e.preventDefault();
  const productData = { name, price, description, image };
  try {
    const response = await axios.post('http://localhost:8800/products/', productData);
    const newProduct = response.data; // Assuming the response contains the newly created product
    dispatch({ type: "CREATE_PRODUCT", payload: newProduct });

    // Reset the form after successful submission
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    navigate('/');
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default Create;
