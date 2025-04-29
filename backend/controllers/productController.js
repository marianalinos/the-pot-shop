import { Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = await Product.create({ name, price, image });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.getById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedProduct = await Product.update(id, { name, price, image });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.delete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, data: deletedProduct });
  } catch (error) {
    console.error("Error deleting product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};