import { sql } from "../config/db.js";

export const Cupom = {
  // Get all coupons
  getAll: async () => {
    return await sql`SELECT * FROM coupons ORDER BY id DESC`;
  },

  // Get coupon by ID
  getById: async (id) => {
    const result = await sql`SELECT * FROM coupons WHERE id = ${id}`;
    return result.length > 0 ? result[0] : null;
  },

  // Create new coupon
  create: async ({ name, discount }) => {
    return await sql`
      INSERT INTO coupons (name, discount)
      VALUES (${name}, ${discount})
      RETURNING *
    `;
  },

  // Update coupon
  update: async (id, { name, discount }) => {
    return await sql`
      UPDATE coupons
      SET name = ${name}, discount = ${discount}
      WHERE id = ${id}
      RETURNING *
    `;
  },

  // Delete coupon
  delete: async (id) => {
    return await sql`
      DELETE FROM coupons
      WHERE id = ${id}
      RETURNING *
    `;
  },

  // Validate coupon by name
  validate: async (name) => {
    const result = await sql`
      SELECT * FROM coupons 
      WHERE name = ${name}
    `;
    return result.length > 0 ? result[0] : null;
  }
};