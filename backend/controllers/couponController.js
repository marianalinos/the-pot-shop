import { Coupon } from "../models/Coupon.js";

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.getAll();
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    console.error("Error fetching coupons: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCoupon = async (req, res) => {
  const { name, discount } = req.body;

  if (!name || discount === undefined) {
    return res.status(400).json({ message: "Both name and discount are required" });
  }

  try {
    const newCoupon = await Coupon.create({ name, discount });
    res.status(201).json({ success: true, data: newCoupon });
  } catch (error) {
    console.error("Error creating coupon: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCoupon = async (req, res) => {
  const { id } = req.params;
  
  try {
    const coupon = await Coupon.getById(id);
    
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.error("Error fetching coupon: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { name, discount } = req.body;

  if (!name || discount === undefined) {
    return res.status(400).json({ message: "Both name and discount are required" });
  }

  try {
    const updatedCoupon = await Coupon.update(id, { name, discount });
    
    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ success: true, data: updatedCoupon });
  } catch (error) {
    console.error("Error updating coupon: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCoupon = await Coupon.delete(id);
    
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ success: true, data: deletedCoupon });
  } catch (error) {
    console.error("Error deleting coupon: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateCoupon = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Coupon name is required" });
  }

  try {
    const coupon = await Coupon.validate(name);
    
    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid coupon" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Coupon is valid",
      data: coupon 
    });
  } catch (error) {
    console.error("Error validating coupon: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};