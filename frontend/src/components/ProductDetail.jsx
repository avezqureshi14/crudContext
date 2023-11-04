import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = (props) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const productId = useParams();
  console.log(productId.id);
    useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/products/${productId.id}`);
      console.log(res.data); // check if the response is coming back as expected
      setProduct(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  fetchProduct();
}, [productId.id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.name} />

    </div>
  );
};

export default ProductDetail;
