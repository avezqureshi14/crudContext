const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/product");
const connectToDatabase = require("./db/connection");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductByName,
} = require("./controllers/product");
const { loginUser, signupUser } = require("./controllers/user");
const requireAuth = require("./middleware/requireAuth");
const app = express();
app.use(cors());
app.use(bodyParser.json());
connectToDatabase();

app.post("/login", loginUser);
app.post("/signup", signupUser);

//using auth for all routes
app.use(requireAuth);

//create product
app.post("/products", createProduct);

// Get all products
app.get("/products", getAllProducts);

// Get a product by ID
app.get("/products/:id", getProductById);

// Update a product by ID
app.put("/products/:id", updateProduct);

// Delete a product by ID
app.delete("/products/:id", deleteProduct);

app.listen(8800, () => {
  console.log("Server started on port 8800");
});
