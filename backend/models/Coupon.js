import { sql } from "../config/db.js";

export const Coupon = {
  getAll: async () => {
    return await sql`SELECT * FROM coupons`;
  },

  getById: async (id) => {
    const [coupon] = await sql`SELECT * FROM coupons WHERE id = ${id}`;
    return coupon || null;
  },

  getByName: async (name) => {
    const [coupon] = await sql`SELECT * FROM coupons WHERE name = ${name}`;
    return coupon || null;
  },

  create: async ({ name, discount }) => {
    const [newCoupon] = await sql`
      INSERT INTO coupons (name, discount)
      VALUES (${name}, ${discount})
      RETURNING *
    `;
    return newCoupon;
  },

  update: async (id, { name, discount }) => {
    const [updatedCoupon] = await sql`
      UPDATE coupons
      SET name = ${name}, discount = ${discount}
      WHERE id = ${id}
      RETURNING *
    `;
    return updatedCoupon || null;
  },

  delete: async (id) => {
    const [deletedCoupon] = await sql`
      DELETE FROM coupons
      WHERE id = ${id}
      RETURNING *
    `;
    return deletedCoupon || null;
  },

  validate: async (name) => {
    const [coupon] = await sql`SELECT * FROM coupons WHERE name = ${name}`;
    return coupon || null;
  }
};