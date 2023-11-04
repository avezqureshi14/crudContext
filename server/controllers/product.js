const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const products = await Product.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const user_id = req.user._id; // Assuming user_id is available in the req.user object

    const product = new Product({
      name,
      price,
      description,
      image,
      user_id, // Associate the product with the user
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // // Check if the user is the owner of the product
    // if (product.user_id !== req.user._id) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.body.image;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

