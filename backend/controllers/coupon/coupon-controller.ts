import { Coupon } from "../../models/coupon.js";

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.getAll();
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ success: false, message: "Failed to fetch coupons" });
  }
};

export const createCoupon = async (req, res) => {
  const { name, discount } = req.body;

  if (!name || discount === undefined) {
    return res.status(400).json({ 
      success: false, 
      message: "Name and discount are required" 
    });
  }

  try {
    const existingCoupon = await Coupon.getByName(name);
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon with this name already exists"
      });
    }

    const newCoupon = await Coupon.create({ name, discount });
    res.status(201).json({ success: true, data: newCoupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to create coupon" 
    });
  }
};

export const getCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const coupon = await Coupon.getById(id);
    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: "Coupon not found" 
      });
    }
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch coupon" 
    });
  }
};

export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { name, discount } = req.body;

  if (!name || discount === undefined) {
    return res.status(400).json({ 
      success: false, 
      message: "Name and discount are required" 
    });
  }

  try {
    const currentCoupon = await Coupon.getById(id);
    if (!currentCoupon) {
      return res.status(404).json({ 
        success: false, 
        message: "Coupon not found" 
      });
    }

    if (currentCoupon.name !== name) {
      const existingCoupon = await Coupon.getByName(name);
      if (existingCoupon) {
        return res.status(400).json({
          success: false,
          message: "Coupon with this name already exists"
        });
      }
    }

    const updatedCoupon = await Coupon.update(id, { name, discount });
    res.status(200).json({ success: true, data: updatedCoupon });
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update coupon" 
    });
  }
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCoupon = await Coupon.delete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ 
        success: false, 
        message: "Coupon not found" 
      });
    }
    res.status(200).json({ success: true, data: deletedCoupon });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete coupon" 
    });
  }
};

export const validateCoupon = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ 
      success: false, 
      message: "Coupon name is required" 
    });
  }

  try {
    const coupon = await Coupon.validate(name);
    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid coupon" 
      });
    }
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.error("Error validating coupon:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to validate coupon" 
    });
  }
};