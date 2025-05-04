import { sql } from "../config/db.js";

export const Order = {
  getAll: async () => {
    return await sql`SELECT * FROM orders`;
  },

  getById: async (id) => {
    const result = await sql`SELECT * FROM orders WHERE id = ${id}`;
    return result[0];
  },

  create: async ({ status, customer_id, cart_id }) => {
    return await sql`
      INSERT INTO orders (status, customer_id, cart_id)
      VALUES (${status}, ${customer_id}, ${cart_id})
      RETURNING *
    `;
  },

  update: async (id, { status, customer_id, cart_id }) => {
    return await sql`
      UPDATE orders
      SET status = ${status}, 
          customer_id = ${customer_id}, 
          cart_id = ${cart_id}
      WHERE id = ${id}
      RETURNING *
    `;
  },

  delete: async (id) => {
    return await sql`
      DELETE FROM orders 
      WHERE id = ${id} 
      RETURNING *
    `;
  }
};