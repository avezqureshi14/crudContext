import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";
const Home = () => {
  // const [products, setProducts] = useState([]);
  const { products, dispatch } = useProductsContext();
  useEffect(() => {
    axios
      .get("http://localhost:8800/products")
      .then((response) => {
        dispatch({ type: "SET_PRODUCTS", payload: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8800/products/${productId}`);
      dispatch({ type: "DELETE_PRODUCT", payload: productId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      {products &&
        products.map((product) => (
          <div key={product._id}>
            <Link to={`/product/${product._id}`}>
              <h2>{product.name}</h2>
            </Link>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.image} alt={product.name} />
            <Link to={`/update/${product._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default Home;
