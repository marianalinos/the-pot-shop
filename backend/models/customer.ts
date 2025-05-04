import { sql } from "../config/db.js";

export const Customer = {
  getAll: async () => {
    return await sql`SELECT * FROM customers`;
  },

  getById: async (id) => {
    const result = await sql`SELECT * FROM customers WHERE id = ${id}`;
    return result[0];
  },

  create: async ({ name, email, password, wallet }) => {
    return await sql`
      INSERT INTO customers (name, email, password, wallet)
      VALUES (${name}, ${email}, ${password}, ${wallet})
      RETURNING *
    `;
  },

  update: async (id, { name, email, password, wallet }) => {
    return await sql`
      UPDATE customers
      SET name = ${name}, 
          email = ${email}, 
          password = ${password}, 
          wallet = ${wallet}
      WHERE id = ${id}
      RETURNING *
    `;
  },

  delete: async (id) => {
    return await sql`
      DELETE FROM customers 
      WHERE id = ${id} 
      RETURNING *
    `;
  }
};