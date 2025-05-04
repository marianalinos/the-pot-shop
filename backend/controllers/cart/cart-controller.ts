import { Cart } from "../../models/cart.js";
import { Coupon } from "../../models/coupon.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const { products = [], coupon_id } = req.body;

    if (coupon_id) {
      const coupon = await Coupon.getById(coupon_id);
      if (!coupon) {
        return res.status(400).json({ error: "Invalid coupon ID" });
      }
    }

    const cart = await Cart.create({
      products,
      coupon_id: coupon_id || null,
    });

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message.includes("don't exist")
        ? "One or more products don't exist"
        : "Failed to create cart",
    });
  }
};

export const getCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.getById(id);
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Cart not found" 
      });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch cart" 
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { products, coupon_id } = req.body;

    if (coupon_id) {
      const coupon = await Coupon.getById(coupon_id);
      if (!coupon) {
        return res.status(400).json({ error: "Invalid coupon ID" });
      }
    }

    const cart = await Cart.update(req.params.id, {
      products: products || [],
      coupon_id: coupon_id || null,
    });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    await Cart.calculateTotal(cart.id);
    const updatedCart = await Cart.getById(cart.id);

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.delete(req.params.id);
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
