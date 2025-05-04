import { sql } from "../config/db.js";

export const Cart = {
  getAll: async () => {
    return await sql`SELECT * FROM carts`;
  },

  getById: async (id) => {
    const [cart] = await sql`SELECT * FROM carts WHERE id = ${id}`;
    return cart || null;
  },

  create: async ({ products = [], coupon_id = null }) => {
    // First validate all products exist
    const productCheck = await sql`
      SELECT id FROM products WHERE id = ANY(${products})
    `;
    if (productCheck.length !== [...new Set(products)].length) {
      throw new Error("Some products don't exist");
    }

    // Create cart with temporary total 0
    const [newCart] = await sql`
      INSERT INTO carts (products, coupon_id, total)
      VALUES (${products}, ${coupon_id}, 0)
      RETURNING *
    `;

    // Calculate and set real total
    const total = await Cart._calculateTotal(newCart.id);
    await sql`
      UPDATE carts SET total = ${total} WHERE id = ${newCart.id}
    `;

    return await Cart.getById(newCart.id);
  },

  update: async (id, { products, coupon_id }) => {
    await sql`
      UPDATE carts
      SET products = ${products},
          coupon_id = ${coupon_id}
      WHERE id = ${id}
    `;

    // Recalculate total
    const total = await Cart._calculateTotal(id);
    await sql`
      UPDATE carts SET total = ${total} WHERE id = ${id}
    `;

    return await Cart.getById(id);
  },

  delete: async (id) => {
    return await sql`
      DELETE FROM carts 
      WHERE id = ${id} 
      RETURNING *
    `;
  },

  // Private calculation method
  _calculateTotal: async (cartId) => {
    const cart = await Cart.getById(cartId);
    if (!cart) return 0;

    // Count product quantities
    const productCounts = {};
    cart.products.forEach(id => {
      productCounts[id] = (productCounts[id] || 0) + 1;
    });

    // Get product prices
    const productIds = Object.keys(productCounts);
    const products = productIds.length ? await sql`
      SELECT * FROM products WHERE id = ANY(${productIds})
    ` : [];

    // Calculate subtotal
    let subtotal = 0;
    products.forEach(product => {
      subtotal += parseFloat(product.price) * productCounts[product.id];
    });

    // Apply coupon discount
    let total = subtotal;
    if (cart.coupon_id) {
      const [coupon] = await sql`SELECT * FROM coupons WHERE id = ${cart.coupon_id}`;
      if (coupon) {
        total = Math.max(0, subtotal - parseFloat(coupon.discount));
      }
    }

    return parseFloat(total.toFixed(2));
  }
};