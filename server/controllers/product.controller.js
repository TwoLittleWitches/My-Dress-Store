import Product from "../models/product.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

// Get Product(s) by Keyword Method
const productsByKeyword = async (req, res) => {
  try {
    // Access the query parameter using req.query.name
    const keyword = req.query.name;

    // Check if a keyword is provided when searching
    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    // Perform a text search using the $text operator
    const products = await Product.find(
      {
        // Search for keyword in name - not case-sensitive
        $text: { $search: keyword, $caseSensitive: false },
      },
      {
        // Optional - Relevance score
        score: { $meta: "textScore" },
      }
    )
      // Show only product name in results
      .select("name")
      // Sort by relevance score
      .sort({ score: { $meta: "textScore" } });

    if (products.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.json(products);
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(400).json({
      error: err.message, // Return the actual error message
    });
  }
};

// Get All Products Method
const list = async (req, res) => {
  try {
    // Retrieve all products without a keyword filter
    const products = await Product.find().select(
      "name description price published category"
    );
    res.json(products);
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(400).json({
      error: err.message, // Return the actual error message
    });
  }
};

// Get Product by ID Method
const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id);
    if (!product) return res.status(400).json({ error: "Product not found" });
    req.profile = product;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve product",
    });
  }
};

// New Product Method
const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: "Product added succesfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Product Update Method
const update = async (req, res) => {
  try {
    let product = req.profile;
    product = extend(product, req.body);
    product.updated = Date.now();
    await product.save();
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  return res.json(req.profile);
};

// Delete One Method
const remove = async (req, res) => {
  try {
    let product = req.profile;
    let deletedProduct = await product.deleteOne();
    res.json(deletedProduct);
  } catch (err) {
    res.status(400).json({ message: "Product not Deleted" });
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Delete All Method
const removeAll = async (req, res) => {
  try {
    const deletedProducts = await Product.deleteMany({});
    res.json(deletedProducts);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

export default {
  list,
  productsByKeyword,
  productByID,
  create,
  update,
  read,
  remove,
  removeAll,
};
